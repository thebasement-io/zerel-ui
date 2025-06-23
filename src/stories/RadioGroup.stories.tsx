import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import '@/index.css'

const meta = {
    title: 'UI/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
            </div>
        </RadioGroup>
    ),
}

export const Disabled: Story = {
    render: () => (
        <RadioGroup defaultValue="option-one" disabled>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
            </div>
        </RadioGroup>
    ),
}

export const WithDescriptions: Story = {
    render: () => (
        <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="r1">Default</Label>
                    <p className="text-xs text-muted-foreground">
                        Recommended for most users.
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="r2">Comfortable</Label>
                    <p className="text-xs text-muted-foreground">
                        More space between elements.
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="r3">Compact</Label>
                    <p className="text-xs text-muted-foreground">
                        Less space between elements.
                    </p>
                </div>
            </div>
        </RadioGroup>
    ),
}

export const Form: Story = {
    render: () => (
        <div className="space-y-3">
            <Label className="text-base font-medium">
                Which size would you like?
            </Label>
            <RadioGroup defaultValue="medium">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Large</Label>
                </div>
            </RadioGroup>
        </div>
    ),
} 