import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import '@/index.css'

const meta = {
    title: 'UI/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [date, setDate] = React.useState<Date | undefined>(new Date())

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        )
    },
}

export const Multiple: Story = {
    render: () => {
        const [dates, setDates] = React.useState<Date[] | undefined>([])

        return (
            <Calendar
                mode="multiple"
                selected={dates}
                onSelect={setDates}
                className="rounded-md border"
            />
        )
    },
}

export const Range: Story = {
    render: () => {
        const [dateRange, setDateRange] = React.useState<any>()

        return (
            <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border"
            />
        )
    },
}

export const Disabled: Story = {
    render: () => (
        <Calendar
            mode="single"
            disabled
            className="rounded-md border"
        />
    ),
}

export const WithDisabledDates: Story = {
    render: () => {
        const [date, setDate] = React.useState<Date | undefined>()

        const disabledDays = [
            new Date(2024, 0, 1), // New Year's Day
            new Date(2024, 11, 25), // Christmas
        ]

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={disabledDays}
                className="rounded-md border"
            />
        )
    },
} 