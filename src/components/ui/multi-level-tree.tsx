'use client'
import { useState, useMemo, useEffect, type JSX } from 'react'
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Home,
    Building2,
    type LucideIcon,
} from 'lucide-react'
import { Button } from './button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from './card'
import { Separator } from './separator'
import { Badge } from './badge'

export type Hierarchy = {
    id: number
    label: string
    id_parent: number
    depth: number
    full_path: string
    parent_full_path: string
    id_path: string
    parent_id_path: string
}

export type HierarchyResponse = {
    data: Hierarchy[]
    count: number
    total: number
    page: number
    pageSize: number
}

export interface IconTreeMap {
    [key: string]: LucideIcon
}
export type HierarchyWithChildren = Hierarchy & {
    children: HierarchyWithChildren[]
}

export type BreadcrumbItem = {
    id: number | null
    label: string
    value: string
    depth: number
}

export type TreeStructure = {
    treeMap: Map<number, HierarchyWithChildren>
    itemsByDepth: Map<number, Hierarchy[]>
    minDepth: number
    maxDepth: number
}

export type MultiLevelTreeProps = {
    hierarchyData: Hierarchy[]
    name: string
    defaultValue?: string
}
const getIcon = (value: number): JSX.Element => {
    const iconMap: IconTreeMap = {
        company: Building2,
        root: Home,
    }
    const IconComponent = iconMap[value] || Building2
    return <IconComponent className="h-4 w-4" />
}

export default function MultiLevelTree({
    hierarchyData,
    name,
}: MultiLevelTreeProps) {
    const [currentDepth, setCurrentDepth] = useState<number>(-1) // -1 means root level (before any data)
    const [selectedItem, setSelectedItem] = useState<Hierarchy | null>(null)
    const [navigationPath, setNavigationPath] = useState<number[]>([]) // Track the path of navigation

    // Build tree structure from flat data and organize by depth
    const { treeMap, itemsByDepth, minDepth, maxDepth }: TreeStructure =
        useMemo(() => {
            const treeMap = new Map<number, HierarchyWithChildren>()
            const itemsByDepth = new Map<number, Hierarchy[]>()

            for (const item of hierarchyData) {
                treeMap.set(item.id, { ...item, children: [] })
                itemsByDepth.set(item.depth, [
                    ...(itemsByDepth.get(item.depth) || []),
                    item,
                ])
            }

            for (const item of hierarchyData) {
                if (item.id_parent && treeMap.has(item.id_parent)) {
                    treeMap
                        .get(item.id_parent)!
                        .children.push(treeMap.get(item.id)!)
                }
            }

            const depths = Array.from(itemsByDepth.keys())
            const minDepth = Math.min(...depths)
            const maxDepth = Math.max(...depths)

            return { treeMap, itemsByDepth, minDepth, maxDepth }
        }, [hierarchyData])

    // Auto-select item based on current depth and navigation path
    useEffect(() => {
        let item: HierarchyWithChildren | null = null
        if (navigationPath.length) {
            item =
                treeMap.get(navigationPath[navigationPath.length - 1]) || null
        } else {
            const depth = currentDepth === -1 ? minDepth : currentDepth
            const firstId = itemsByDepth.get(depth)?.[0]?.id
            item = firstId ? treeMap.get(firstId) || null : null
        }
        setSelectedItem(item)
    }, [currentDepth, navigationPath, itemsByDepth, minDepth, treeMap])

    // Get current level items based on current depth and navigation path
    const currentItems: HierarchyWithChildren[] = useMemo(() => {
        if (currentDepth === -1) {
            // Root level: show items of minimum depth
            const items = itemsByDepth.get(minDepth) || []
            return items.map((item) => treeMap.get(item.id)!).filter(Boolean)
        } else if (currentDepth >= maxDepth) {
            // At maximum depth: show leaf nodes
            const items = itemsByDepth.get(currentDepth) || []
            return items.map((item) => treeMap.get(item.id)!).filter(Boolean)
        } else {
            // Intermediate level: show children of the current selected item
            if (navigationPath.length > 0) {
                const currentNodeId = navigationPath[navigationPath.length - 1]
                const currentNode = treeMap.get(currentNodeId)
                return currentNode ? currentNode.children : []
            } else {
                // Show items of the next depth level
                const items = itemsByDepth.get(currentDepth + 1) || []
                return items
                    .map((item) => treeMap.get(item.id)!)
                    .filter(Boolean)
            }
        }
    }, [
        currentDepth,
        navigationPath,
        itemsByDepth,
        minDepth,
        maxDepth,
        treeMap,
    ])

    // Get accessible hierarchy IDs based on user's data access
    const accessibleIds: Set<number> = useMemo(() => {
        const accessible = new Set<number>()

        // Add all IDs from the provided hierarchy data (these are the ones user has access to)
        hierarchyData.forEach((item) => {
            accessible.add(item.id)

            // Also add all IDs from the id_path to ensure breadcrumb navigation works
            try {
                const idPath: number[] = JSON.parse(item.id_path)
                idPath.forEach((id) => accessible.add(id))
            } catch (error) {
                console.error('Error parsing id_path:', error)
            }
        })

        return accessible
    }, [hierarchyData])

    // Build breadcrumb from navigation path and selected item
    const breadcrumb: BreadcrumbItem[] = useMemo(() => {
        if (!selectedItem) return []
        return navigationPath.map((id) => {
            const node = treeMap.get(id)
            return node
                ? {
                      id: node.id,
                      label: node.label,
                      value: `node_${node.id}`,
                      depth: node.depth,
                  }
                : null
        }) as BreadcrumbItem[]
    }, [navigationPath, treeMap, selectedItem])

    const handleItemClick = (item: HierarchyWithChildren): void => {
        const isLeaf = !item.children || item.children.length === 0
        if (isLeaf || currentDepth + 1 > maxDepth) {
            setSelectedItem(item)
            return
        }
        setCurrentDepth(currentDepth + 1)
        setNavigationPath([...navigationPath, item.id])
    }

    const handleRootBreadcrumbClick = (): void => {
        setCurrentDepth(-1)
        setNavigationPath([])
    }

    const handleBreadcrumbClick = (crumb: BreadcrumbItem): void => {
        // Check if user has access to this level
        if (crumb.id && !accessibleIds.has(crumb.id)) {
            return // Don't allow navigation to inaccessible levels
        }

        // If root, reset
        // if (crumb.depth === minDepth) {
        //     setCurrentDepth(-1)
        //     setNavigationPath([])
        //     return
        // }

        // Find the index of the crumb in the breadcrumb path
        const idx = breadcrumb.findIndex((b) => b.id === crumb.id)
        if (idx !== -1) {
            // Set navigation path up to this crumb (inclusive)
            setNavigationPath(
                breadcrumb
                    .slice(0, idx + 1)
                    .map((b) => b.id)
                    .filter((id): id is number => id !== null),
            )
            setCurrentDepth(crumb.depth)
        }
    }

    const goBack = (): void => {
        if (currentDepth <= -1) return
        setCurrentDepth((depth) => depth - 1)
        setNavigationPath((path) => path.slice(0, -1))
    }

    const resetSelection = (): void => {
        setCurrentDepth(-1)
        setNavigationPath([])
        // selectedItem will be updated by useEffect
    }

    const getCurrentLevelTitle = (): string => {
        if (currentDepth === -1) return 'Organization'
        if (selectedItem) return `${selectedItem.label} - Sublevel`
        return `Level ${currentDepth + 1}`
    }

    const canGoBack: boolean = currentDepth > -1

    return (
        <div className="mx-auto w-full max-w-4xl">
            <input type="hidden" name={name} value={selectedItem?.id || ''} />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-6 w-6" />
                        Multi-Level Tree Navigation
                    </CardTitle>
                    <CardDescription>
                        Navigate through the hierarchical structure. The current
                        level is automatically selected.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Selected Item Display */}
                    {selectedItem && (
                        <Card className="border-green-200 bg-green-50">
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                            <Check className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-green-600">
                                                Current Level Selection
                                            </p>
                                            <p className="text-lg font-semibold text-green-800">
                                                {selectedItem.label}
                                            </p>
                                            <p className="text-sm text-green-600">
                                                ID: {selectedItem.id} | Depth:{' '}
                                                {selectedItem.depth}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={resetSelection}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Reset Selection
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Breadcrumb Navigation */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-wrap items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                    <Button
                                        type="button"
                                        onClick={handleRootBreadcrumbClick}
                                        variant="ghost"
                                        size="sm"
                                        disabled={
                                            !accessibleIds.has(1) &&
                                            !accessibleIds.has(2)
                                        }
                                        className="p-2"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <Home className="size-4" />
                                        </div>
                                    </Button>
                                    {breadcrumb.length > 0 && (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </div>
                                {breadcrumb.map(
                                    (crumb: BreadcrumbItem, index: number) => {
                                        const hasAccess = crumb.id
                                            ? accessibleIds.has(crumb.id)
                                            : true
                                        const isDisabled = !hasAccess

                                        return (
                                            <div
                                                key={`${crumb.id}-${index}`}
                                                className="flex items-center space-x-2"
                                            >
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleBreadcrumbClick(
                                                            crumb,
                                                        )
                                                    }
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={isDisabled}
                                                    className="p-2"
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        {getIcon(crumb.depth)}
                                                        <span>
                                                            {crumb.label}
                                                        </span>
                                                        {isDisabled && (
                                                            <span className="ml-1 text-xs">
                                                                (No Access)
                                                            </span>
                                                        )}
                                                    </div>
                                                </Button>
                                                {index <
                                                    breadcrumb.length - 1 && (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </div>
                                        )
                                    },
                                )}
                            </div>

                            {/* Back Button */}
                            {canGoBack && (
                                <Button
                                    type="button"
                                    onClick={goBack}
                                    variant="outline"
                                    size="sm"
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Back
                                </Button>
                            )}
                        </div>
                        <Separator />
                    </div>

                    {/* Current Level Options */}
                    <div className="space-y-3">
                        {currentItems.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">
                                        {getCurrentLevelTitle()}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">
                                            {currentItems.length} option
                                            {currentItems.length !== 1
                                                ? 's'
                                                : ''}
                                        </Badge>
                                        <Badge variant="outline">
                                            Depth:{' '}
                                            {currentDepth === -1
                                                ? minDepth
                                                : Math.min(
                                                      currentDepth + 1,
                                                      maxDepth,
                                                  )}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    {currentItems.map(
                                        (item: HierarchyWithChildren) => {
                                            const hasChildren =
                                                item.children &&
                                                item.children.length > 0
                                            const isCurrentlySelected =
                                                selectedItem &&
                                                selectedItem.id === item.id
                                            const canNavigateForward =
                                                hasChildren &&
                                                currentDepth + 1 <= maxDepth

                                            return (
                                                <Card
                                                    key={item.id}
                                                    className={`hover:border-primary/50 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                                        isCurrentlySelected
                                                            ? 'ring-primary/20 border-primary/50 ring-2'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        handleItemClick(item)
                                                    }
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                                                                    {getIcon(
                                                                        item.depth,
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-foreground font-medium">
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </h4>
                                                                    <p className="text-muted-foreground text-sm">
                                                                        ID:{' '}
                                                                        {
                                                                            item.id
                                                                        }{' '}
                                                                        | Depth:{' '}
                                                                        {
                                                                            item.depth
                                                                        }{' '}
                                                                        |{' '}
                                                                        {hasChildren
                                                                            ? `${item.children.length} children`
                                                                            : 'Leaf node'}
                                                                    </p>
                                                                    {!canNavigateForward &&
                                                                        hasChildren && (
                                                                            <p className="text-xs text-orange-600">
                                                                                Click
                                                                                to
                                                                                go
                                                                                to
                                                                                depth{' '}
                                                                                {
                                                                                    item.depth
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                {isCurrentlySelected && (
                                                                    <Badge
                                                                        variant="default"
                                                                        className="bg-primary/20 text-primary"
                                                                    >
                                                                        Selected
                                                                    </Badge>
                                                                )}
                                                                {!hasChildren && (
                                                                    <div
                                                                        className="h-2 w-2 rounded-full bg-green-500"
                                                                        title="Selectable item"
                                                                    />
                                                                )}
                                                                {canNavigateForward && (
                                                                    <Badge variant="outline">
                                                                        {
                                                                            item
                                                                                .children
                                                                                .length
                                                                        }{' '}
                                                                        items
                                                                    </Badge>
                                                                )}
                                                                {canNavigateForward && (
                                                                    <ChevronRight className="text-muted-foreground h-4 w-4" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        },
                                    )}
                                </div>
                            </>
                        ) : (
                            <Card className="border-dashed">
                                <CardContent className="p-8 text-center">
                                    <p className="text-muted-foreground">
                                        No items available at this level.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
