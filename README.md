# Zerel UI

A React component library built with Vite, Storybook, and Tailwind CSS. Currently, this is primarily a relay of [ShadCN/UI](https://ui.shadcn.com/) components with very small modifications, but it will be evolving rapidly in the coming weeks with custom components and enhanced functionality.

## Installation

You can install Zerel UI using your preferred package manager:

### npm

```sh
npm install zerel-ui
```

### yarn

```sh
yarn add zerel-ui
```

### pnpm

```sh
pnpm add zerel-ui
```

## Setup

Add the following snippet to your main css entrypoint

```css
/* source the zerel-ui's module to tailwind */
@source '../../node_modules/zerel-ui/dist';
@import 'tailwindcss';
@import 'tw-animate-css';
/* import the theme you want to use 'alfil/zerel' */
@import 'zerel-ui/lib/theme-alfil.css';

@layer base {
    * {
        @apply border-border outline-ring/50;
    }

    body {
        @apply bg-background text-foreground;
    }
}
```

## Usage

Import and use components in your React application:

```tsx
import { Button } from 'zerel-ui/button'

function App() {
    return (
        <div>
            <Button variant="default">Click me</Button>
        </div>
    )
}
```

## Development

### Prerequisites

You need to have [pnpm](https://pnpm.io/installation) installed on your machine.

### Local Development Setup

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/zerel-ui.git
    ```
2.  Install dependencies
    ```sh
    pnpm install
    ```

### Available Scripts

### `pnpm run dev`

Runs Storybook in development mode.<br />
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

### `pnpm run build`

Builds the library for production.

### `pnpm run build-storybook`

Builds Storybook for production to the `storybook-static` folder.

### `pnpm run vite`

Runs the app in development mode using Vite.

### `pnpm run preview`

Previews the production build locally.

## Linting and Formatting

### `pnpm run lint`

Lints the project files using ESLint.

### `pnpm run format`

Formats the project files using Prettier.

## Roadmap

This library is currently in active development. While it currently provides ShadCN/UI components with minimal modifications, expect significant changes and additions in the coming weeks, including:

- Custom component designs and variants
- Enhanced theming capabilities
- Additional utility components
- Improved documentation and examples
