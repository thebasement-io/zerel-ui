import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import '@/index.css'

const meta = {
    title: 'UI/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
                <Button>Action</Button>
            </CardFooter>
        </Card>
    ),
}

export const WithAction: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
                <CardAction>
                    <Button variant="outline" size="sm">Mark all as read</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-sm">• New message from John</p>
                    <p className="text-sm">• Meeting reminder</p>
                    <p className="text-sm">• System update available</p>
                </div>
            </CardContent>
        </Card>
    ),
}

export const Simple: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardContent>
                <p>A simple card with just content.</p>
            </CardContent>
        </Card>
    ),
}

export const HeaderOnly: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
        </Card>
    ),
} 