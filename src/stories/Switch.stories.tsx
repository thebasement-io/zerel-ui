import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import '@/index.css'

const meta = {
    title: 'UI/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Switch>

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
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
    ),
} 