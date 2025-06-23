import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import '@/index.css'

const meta = {
    title: 'UI/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    args: {
        type: 'single',
        collapsible: true,
    },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: () => (
        <Accordion type="single" collapsible className="w-[400px]">
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components' aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
}

export const Multiple: Story = {
    args: {},
    render: () => (
        <Accordion type="multiple" className="w-[400px]">
            <AccordionItem value="item-1">
                <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
                <AccordionContent>
                    Yes. With type="multiple", you can open multiple accordion items at the same time.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>This one stays open</AccordionTrigger>
                <AccordionContent>
                    This content will remain visible even when you open other items.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>And so does this one</AccordionTrigger>
                <AccordionContent>
                    Multiple items can be expanded simultaneously.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
}

export const Single: Story = {
    args: {},
    render: () => (
        <Accordion type="single" className="w-[400px]">
            <AccordionItem value="item-1">
                <AccordionTrigger>What is React?</AccordionTrigger>
                <AccordionContent>
                    React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
} 