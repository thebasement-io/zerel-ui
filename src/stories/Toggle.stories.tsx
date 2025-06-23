import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '@/components/ui/toggle'
import '@/index.css'

const meta = {
    title: 'UI/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Toggle',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
}

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small',
    },
}

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large',
    },
}

export const WithIcon: Story = {
    args: {
        size: 'sm',
        children: (
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
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        ),
    },
}

export const Pressed: Story = {
    args: {
        pressed: true,
        children: 'Pressed',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    },
} 