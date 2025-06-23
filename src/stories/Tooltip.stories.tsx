import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import '@/index.css'

const meta = {
    title: 'UI/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ),
}

export const WithDelay: Story = {
    render: () => (
        <TooltipProvider delayDuration={800}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Delayed tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>This tooltip appears after 800ms</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ),
}

export const OnIcon: Story = {
    render: () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add item</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ),
}

export const LongContent: Story = {
    render: () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Long tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <p>
                        This is a longer tooltip content that demonstrates how the tooltip
                        handles multiple lines of text and longer descriptions.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ),
} 