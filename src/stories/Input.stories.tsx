import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'
import '@/index.css'
import { useState } from 'react'

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

export const PhoneMasked: Story = {
    render: () => {
        const [value, setValue] = useState('')

        const maskPhone = (input: string) => {
            const digits = input.replace(/\D/g, '').slice(0, 9)
            const parts = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/)
            if (!parts) return digits
            return [parts[1], parts[2], parts[3]].filter(Boolean).join(' ')
        }

        return (
            <div style={{ width: 300 }}>
                <Input
                    type="tel"
                    placeholder="623 623 623"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    mask={maskPhone}
                />
            </div>
        )
    },
}
