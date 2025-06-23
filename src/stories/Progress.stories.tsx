import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Progress } from '@/components/ui/progress'
import '@/index.css'

const meta = {
    title: 'UI/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        value: 33,
        className: 'w-[300px]',
    },
}

export const Empty: Story = {
    args: {
        value: 0,
        className: 'w-[300px]',
    },
}

export const Half: Story = {
    args: {
        value: 50,
        className: 'w-[300px]',
    },
}

export const Complete: Story = {
    args: {
        value: 100,
        className: 'w-[300px]',
    },
}

export const Loading: Story = {
    render: () => {
        const [progress, setProgress] = React.useState(13)

        React.useEffect(() => {
            const timer = setTimeout(() => setProgress(66), 500)
            return () => clearTimeout(timer)
        }, [])

        return <Progress value={progress} className="w-[300px]" />
    },
} 