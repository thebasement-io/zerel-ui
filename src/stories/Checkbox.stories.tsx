import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import '@/index.css'

const meta = {
    title: 'UI/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}

export const Checked: Story = {
    args: {
        checked: true,
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
    },
}

export const WithLabel: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    ),
}

export const WithError: Story = {
    args: {
        'aria-invalid': true,
    },
}
