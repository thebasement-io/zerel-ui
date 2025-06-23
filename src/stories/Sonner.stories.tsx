import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import '@/index.css'

const meta = {
    title: 'UI/Sonner',
    component: Toaster,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <div>
            <Button
                onClick={() =>
                    toast("Event has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                    })
                }
            >
                Show Toast
            </Button>
            <Toaster />
        </div>
    ),
}

export const Success: Story = {
    render: () => (
        <div>
            <Button
                onClick={() => toast.success("Settings saved successfully!")}
            >
                Success Toast
            </Button>
            <Toaster />
        </div>
    ),
}

export const Error: Story = {
    render: () => (
        <div>
            <Button
                variant="destructive"
                onClick={() => toast.error("Something went wrong!")}
            >
                Error Toast
            </Button>
            <Toaster />
        </div>
    ),
}

export const Warning: Story = {
    render: () => (
        <div>
            <Button
                variant="outline"
                onClick={() => toast.warning("This action cannot be undone")}
            >
                Warning Toast
            </Button>
            <Toaster />
        </div>
    ),
}

export const Loading: Story = {
    render: () => (
        <div>
            <Button
                onClick={() => {
                    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))
                    toast.promise(promise(), {
                        loading: 'Loading...',
                        success: 'Data has been saved!',
                        error: 'Error occurred while saving.',
                    })
                }}
            >
                Loading Toast
            </Button>
            <Toaster />
        </div>
    ),
}

export const WithAction: Story = {
    render: () => (
        <div>
            <Button
                onClick={() =>
                    toast("Event has been created", {
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Toast with Action
            </Button>
            <Toaster />
        </div>
    ),
} 