import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import '@/index.css'

const meta = {
    title: 'UI/AspectRatio',
    component: AspectRatio,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <div className="w-[450px]">
            <AspectRatio ratio={16 / 9}>
                <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo by Drew Beamer"
                    className="h-full w-full rounded-md object-cover"
                />
            </AspectRatio>
        </div>
    ),
}

export const Square: Story = {
    render: () => (
        <div className="w-[300px]">
            <AspectRatio ratio={1}>
                <img
                    src="https://images.unsplash.com/photo-1576075796033-848c2a5a3219?w=800&dpr=2&q=80"
                    alt="Photo by Alvaro Pinot"
                    className="h-full w-full rounded-md object-cover"
                />
            </AspectRatio>
        </div>
    ),
}

export const Portrait: Story = {
    render: () => (
        <div className="w-[300px]">
            <AspectRatio ratio={3 / 4}>
                <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo by Drew Beamer"
                    className="h-full w-full rounded-md object-cover"
                />
            </AspectRatio>
        </div>
    ),
}
