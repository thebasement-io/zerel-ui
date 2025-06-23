import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import '@/index.css'

const meta = {
    title: 'UI/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
}

export const Fallback: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="broken-link" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
}

export const WithoutImage: Story = {
    render: () => (
        <Avatar>
            <AvatarFallback>AC</AvatarFallback>
        </Avatar>
    ),
}

export const Large: Story = {
    render: () => (
        <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
}

export const Small: Story = {
    render: () => (
        <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-xs">CN</AvatarFallback>
        </Avatar>
    ),
} 