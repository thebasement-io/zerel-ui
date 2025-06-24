import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import '@/index.css'

const meta = {
    title: 'UI/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
        </Select>
    ),
}

export const WithDefaultValue: Story = {
    render: () => (
        <Select defaultValue="apple">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
        </Select>
    ),
}

export const Disabled: Story = {
    render: () => (
        <Select disabled>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
            </SelectContent>
        </Select>
    ),
}

export const WithDisabledItems: Story = {
    render: () => (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2" disabled>
                    Option 2 (Disabled)
                </SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
                <SelectItem value="option4" disabled>
                    Option 4 (Disabled)
                </SelectItem>
                <SelectItem value="option5">Option 5</SelectItem>
            </SelectContent>
        </Select>
    ),
}

export const Large: Story = {
    render: () => (
        <Select>
            <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Choose your country" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
            </SelectContent>
        </Select>
    ),
}
