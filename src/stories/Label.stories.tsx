import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import '@/index.css'

const meta = {
    title: 'UI/Label',
    component: Label,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Label',
    },
}

export const WithInput: Story = {
    render: () => (
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
        </div>
    ),
}

export const WithCheckbox: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    ),
}

export const Required: Story = {
    render: () => (
        <Label>
            Email Address <span className="text-destructive">*</span>
        </Label>
    ),
} 