import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import '@/index.css'

const meta = {
	title: 'UI/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="account" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Account</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when you're done.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="name">Name</Label>
							<Input id="name" defaultValue="Joe" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input id="username" defaultValue="Smith" />
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="password" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="current">Current password</Label>
							<Input id="current" type="password" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="new">New password</Label>
							<Input id="new" type="password" />
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	),
}

export const Simple: Story = {
	render: () => (
		<Tabs defaultValue="tab1" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="tab1">Tab 1</TabsTrigger>
				<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				<TabsTrigger value="tab3">Tab 3</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<p>Content for Tab 1</p>
			</TabsContent>
			<TabsContent value="tab2">
				<p>Content for Tab 2</p>
			</TabsContent>
			<TabsContent value="tab3">
				<p>Content for Tab 3</p>
			</TabsContent>
		</Tabs>
	),
}

export const WithIcons: Story = {
	render: () => (
		<Tabs defaultValue="overview" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="overview">
					<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
					Overview
				</TabsTrigger>
				<TabsTrigger value="analytics">
					<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					Analytics
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<p>Overview dashboard content</p>
			</TabsContent>
			<TabsContent value="analytics">
				<p>Analytics dashboard content</p>
			</TabsContent>
		</Tabs>
	),
} 
