import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/components/ui/textarea'
import '@/index.css'

const meta = {
    title: 'UI/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        placeholder: 'Type your message here...',
    },
}

export const WithValue: Story = {
    args: {
        value: 'This is a sample text area with some content.',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'This textarea is disabled',
    },
}

export const WithError: Story = {
    args: {
        placeholder: 'Invalid input',
        'aria-invalid': true,
    },
}

export const Resizable: Story = {
    args: {
        placeholder: 'This textarea can be resized',
        className: 'resize',
    },
}
