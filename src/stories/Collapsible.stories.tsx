import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import '@/index.css'

const meta = {
    title: 'UI/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = React.useState(false)

        return (
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[350px] space-y-2"
            >
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                    </h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                    </div>
                </CollapsibleContent>
            </Collapsible>
        )
    },
}

export const Controlled: Story = {
    render: () => (
        <Collapsible className="w-[350px] space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Settings</h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        Toggle
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 text-sm">
                    Setting 1: Enabled
                </div>
                <div className="rounded-md border px-4 py-3 text-sm">
                    Setting 2: Disabled
                </div>
            </CollapsibleContent>
        </Collapsible>
    ),
}
