import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import '@/index.css'

const meta = {
	title: 'UI/ToggleGroup',
	component: ToggleGroup,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
	args: {
		type: 'single',
		children: (
			<>
				<ToggleGroupItem value="a">A</ToggleGroupItem>
				<ToggleGroupItem value="b">B</ToggleGroupItem>
				<ToggleGroupItem value="c">C</ToggleGroupItem>
			</>
		),
	},
}

export const Multiple: Story = {
	args: {
		type: 'multiple',
		children: (
			<>
				<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
				<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
				<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
			</>
		),
	},
}

export const WithIcons: Story = {
	args: {
		type: 'multiple',
	},
	render: () => (
		<ToggleGroup type="multiple">
			<ToggleGroupItem value="bold" aria-label="Toggle bold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-4 w-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Toggle italic">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-4 w-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0013.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
					/>
				</svg>
			</ToggleGroupItem>
			<ToggleGroupItem value="underline" aria-label="Toggle underline">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-4 w-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
					/>
				</svg>
			</ToggleGroupItem>
		</ToggleGroup>
	),
}

export const Outline: Story = {
	args: {
		type: 'single',
		variant: 'outline',
		children: (
			<>
				<ToggleGroupItem value="left">Left</ToggleGroupItem>
				<ToggleGroupItem value="center">Center</ToggleGroupItem>
				<ToggleGroupItem value="right">Right</ToggleGroupItem>
			</>
		),
	},
}

export const Small: Story = {
	args: {
		type: 'single',
		size: 'sm',
		children: (
			<>
				<ToggleGroupItem value="1">1</ToggleGroupItem>
				<ToggleGroupItem value="2">2</ToggleGroupItem>
				<ToggleGroupItem value="3">3</ToggleGroupItem>
			</>
		),
	},
}

export const Large: Story = {
	args: {
		type: 'single',
		size: 'lg',
		children: (
			<>
				<ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
				<ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
				<ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
			</>
		),
	},
} 
