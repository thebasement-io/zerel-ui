import type { Meta, StoryObj } from '@storybook/react-vite'
import '@/index.css'
import { SampleForm } from '@/samples/form'

const meta = {
    title: 'UI/Form',
    component: SampleForm,
} satisfies Meta<typeof SampleForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => <SampleForm />,
}
