'use client'

import { ChevronDown, ChevronRight, GitBranch } from 'lucide-react'
import { useState, type ElementType } from 'react'
import { Badge } from 'zerel-ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from 'zerel-ui/card'

import { cn } from '@/lib/utils'

export type TreeNode = {
    id: number | string
    label: string
    id_parent: number | string | null
    depth: number
    id_path: Array<number | string>
    badges?: Array<{
        icon: ElementType
        label: string
        count: number
    }>
    icon?: ElementType
}

export type TreeNodeWithChildren = TreeNode & {
    children: TreeNodeWithChildren[]
}

const HierarchyItemLeaf = ({
    node,
    selectedId,
    onSelect,
    name,
}: {
    node: TreeNode
    selectedId?: number | string
    onSelect: (id: number | string) => void
    name: string
}) => {
    const isSelected = selectedId === node.id

    return (
        <div>
            <Card
                className={cn(
                    'group mx-1 mb-1 cursor-pointer rounded-md py-2 transition-colors',
                    isSelected
                        ? 'bg-accent hover:bg-accent/80 text-accent-foreground'
                        : 'hover:bg-accent/30',
                )}
                onClick={() => onSelect(node.id)}
            >
                <CardContent className="px-2 py-0">
                    <div className="flex items-center justify-between gap-2">
                        {node.icon ? <node.icon /> : <></>}
                        <div className="flex flex-1 flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                    {node.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                {node.badges?.map((badge, index) => (
                                    <Badge
                                        key={index + badge.label}
                                        variant="secondary"
                                        className="flex items-center gap-1 text-xs"
                                    >
                                        <badge.icon className="size-3" />
                                        <span>{badge.count}</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {isSelected && <input type="hidden" name={name} value={node.id} />}
        </div>
    )
}

const HierarchyItemWithChildren = ({
    node,
    selectedId,
    onSelect,
    name,
    startOpen,
}: {
    node: TreeNode | TreeNodeWithChildren
    selectedId?: number | string
    onSelect: (id: number | string) => void
    name: string
    startOpen: boolean
}) => {
    const [open, setOpen] = useState(startOpen)
    const isSelected = selectedId === node.id

    if ('children' in node && node.children.length > 0) {
        return (
            <div>
                <Card
                    className={cn(
                        'group mx-1 mb-1 rounded-md py-2 transition-colors',
                        isSelected
                            ? 'bg-accent hover:bg-accent/80 text-accent-foreground'
                            : 'hover:bg-accent/30',
                    )}
                >
                    <CardContent className="px-2 py-0">
                        <div
                            className="flex w-full cursor-pointer items-center justify-start gap-1"
                            onClick={() => onSelect(node.id)}
                        >
                            <button
                                className="hover:bg-accent cursor-pointer rounded-md p-1 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setOpen(!open)
                                }}
                            >
                                {open ? (
                                    <ChevronDown className="size-4" />
                                ) : (
                                    <ChevronRight className="size-4" />
                                )}
                            </button>
                            {node.icon ? <node.icon /> : <></>}
                            <div className="flex flex-1 flex-col">
                                <span className="text-sm font-medium">
                                    {node.label}
                                </span>
                                <div className="flex items-center gap-1">
                                    {node.badges?.map((badge, index) => (
                                        <Badge
                                            key={index + badge.label}
                                            variant="secondary"
                                            className="flex items-center gap-1 text-xs"
                                        >
                                            <badge.icon className="size-3" />
                                            <span>{badge.count}</span>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {isSelected && (
                    <input type="hidden" name={name} value={node.id} />
                )}
                <div
                    className={cn(
                        'border-border/50 ml-3 border-l-2 pl-1',
                        open ? 'block' : 'hidden',
                    )}
                >
                    <div className="space-y-0">
                        {node.children.map((child) => (
                            <HierarchyItem
                                key={child.id}
                                node={child}
                                selectedId={selectedId}
                                onSelect={onSelect}
                                name={name}
                                startOpen={startOpen}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <HierarchyItemLeaf
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
            name={name}
        />
    )
}

const HierarchyItem = ({
    node,
    selectedId,
    onSelect,
    name,
    startOpen,
}: {
    node: TreeNode | TreeNodeWithChildren
    selectedId?: number | string
    onSelect: (id: number | string) => void
    name: string
    startOpen: boolean
}) => {
    if ('children' in node && node.children.length > 0) {
        return (
            <HierarchyItemWithChildren
                node={node}
                selectedId={selectedId}
                onSelect={onSelect}
                name={name}
                startOpen={startOpen}
            />
        )
    }
    return (
        <HierarchyItemLeaf
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
            name={name}
        />
    )
}

export type HierarchySelectorProps = {
    name: string
    defaultValue?: number | string
    data: TreeNode[]
    className?: string
    startOpen?: boolean
}

export const HierarchySelector = ({
    name,
    defaultValue,
    data,
    className,
    startOpen = true,
}: HierarchySelectorProps) => {
    const [selectedId, setSelectedId] = useState<number | string | undefined>(
        defaultValue,
    )

    return (
        <Card className={cn('gap-2', className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <GitBranch className="size-4" />
                    Seleccionar Jerarquía
                </CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-0">
                <div className="max-h-[calc(100dvh-224px)] overflow-y-auto">
                    {data.map((node) => (
                        <HierarchyItem
                            startOpen={startOpen}
                            key={node.id}
                            node={node}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            name={name}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
