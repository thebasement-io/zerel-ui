import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import '@/index.css'

const meta = {
    title: 'UI/ScrollArea',
    component: ScrollArea,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {Array.from({ length: 50 }).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="text-sm">
                            v1.2.0-beta.{i}
                        </div>
                        {i < 49 && <Separator className="my-2" />}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    ),
}

export const Horizontal: Story = {
    render: () => (
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <figure key={i} className="shrink-0">
                        <div className="overflow-hidden rounded-md">
                            <img
                                src={`https://picsum.photos/300/400?random=${i}`}
                                alt={`Photo ${i + 1}`}
                                className="aspect-[3/4] h-fit w-fit object-cover"
                                width={300}
                                height={400}
                            />
                        </div>
                        <figcaption className="pt-2 text-xs text-muted-foreground">
                            Photo by John Doe
                        </figcaption>
                    </figure>
                ))}
            </div>
        </ScrollArea>
    ),
}

export const WithCustomScrollbar: Story = {
    render: () => (
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <div className="space-y-3">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="text-sm">
                        This is message {i + 1} in the scroll area.
                    </div>
                ))}
            </div>
        </ScrollArea>
    ),
} 