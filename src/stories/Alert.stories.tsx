import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import '@/index.css'

const meta = {
    title: 'UI/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the cli.
            </AlertDescription>
        </Alert>
    ),
}

export const Destructive: Story = {
    render: () => (
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Your session has expired. Please log in again.
            </AlertDescription>
        </Alert>
    ),
}

export const WithIcon: Story = {
    render: () => (
        <Alert>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
            </svg>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
                This action cannot be undone. This will permanently delete your
                account.
            </AlertDescription>
        </Alert>
    ),
}

export const TitleOnly: Story = {
    render: () => (
        <Alert>
            <AlertTitle>Success! Your changes have been saved.</AlertTitle>
        </Alert>
    ),
}
