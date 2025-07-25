import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'
import '@/index.css'

const meta = {
    title: 'UI/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Badge',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
}

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Destructive',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
}
