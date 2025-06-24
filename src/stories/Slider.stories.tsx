import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from '@/components/ui/slider'
import '@/index.css'

const meta = {
    title: 'UI/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        defaultValue: [33],
        max: 100,
        step: 1,
        className: 'w-[60%]',
    },
}

export const Range: Story = {
    args: {
        defaultValue: [25, 75],
        max: 100,
        step: 1,
        className: 'w-[60%]',
    },
}

export const WithSteps: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        step: 10,
        className: 'w-[60%]',
    },
}

export const Disabled: Story = {
    args: {
        defaultValue: [50],
        max: 100,
        step: 1,
        disabled: true,
        className: 'w-[60%]',
    },
}

export const Small: Story = {
    args: {
        defaultValue: [20],
        max: 50,
        step: 1,
        className: 'w-[40%]',
    },
}
