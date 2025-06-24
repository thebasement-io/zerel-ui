import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator'
import '@/index.css'

const meta = {
    title: 'UI/Separator',
    component: Separator,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
    render: () => (
        <div className="w-[300px] space-y-4">
            <div>Content above separator</div>
            <Separator />
            <div>Content below separator</div>
        </div>
    ),
}

export const Vertical: Story = {
    render: () => (
        <div className="flex h-20 items-center space-x-4">
            <div>Left content</div>
            <Separator orientation="vertical" />
            <div>Right content</div>
        </div>
    ),
}

export const InText: Story = {
    render: () => (
        <div className="w-[300px]">
            <div className="space-y-1">
                <h4 className="text-sm leading-none font-medium">
                    Radix Primitives
                </h4>
                <p className="text-muted-foreground text-sm">
                    An open-source UI component library.
                </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
            </div>
        </div>
    ),
}
