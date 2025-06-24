import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'
import '@/index.css'

const meta = {
    title: 'UI/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
}

export const WithValue: Story = {
    args: {
        value: 'Hello World',
    },
}

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password...',
    },
}

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter email...',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input',
    },
}

export const WithError: Story = {
    args: {
        placeholder: 'Invalid input',
        'aria-invalid': true,
    },
}
