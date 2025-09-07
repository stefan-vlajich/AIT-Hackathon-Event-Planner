# Plan It - React + Vite + Tailwind CSS + TypeScript

A modern React application built with Vite, Tailwind CSS v3, and TypeScript.

## Tech Stack

- **React 19** - UI library
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v3** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible React components
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   └── ui/             # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── badge.tsx
│       ├── avatar.tsx
│       └── dialog.tsx
├── lib/
│   └── utils.ts        # Utility functions for shadcn/ui
├── assets/             # Static assets
│   ├── images/         # For photos, backgrounds, illustrations
│   ├── icons/          # For icons, small graphics
│   └── react.svg       # (existing)
├── App.tsx             # Main App component
├── main.tsx            # Entry point
└── index.css           # Global styles with Tailwind directives
```

## Features

- ⚡ Fast development with Vite HMR
- 🎨 Tailwind CSS for rapid styling
- 🧩 shadcn/ui components for beautiful UI
- 📝 TypeScript for type safety
- 🔧 ESLint for code quality
- 🏗️ Modern React 19 with hooks
- 📁 Path aliases configured (`@/` for src/)

## Available shadcn/ui Components

The following components are pre-installed and ready to use:

- **Button** - Various button styles and sizes
- **Card** - Content containers with header/footer
- **Input** - Form input fields
- **Label** - Form labels
- **Badge** - Status indicators and tags
- **Avatar** - User profile pictures
- **Dialog** - Modal dialogs and popups

### Adding More Components

To add additional shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

View all available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components)

### Component Usage Examples

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter text..." />
        <div className="flex gap-2">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
        <Badge variant="secondary">Status Badge</Badge>
      </CardContent>
    </Card>
  )
}
```

## Customization

### Tailwind CSS

The Tailwind configuration is in `tailwind.config.js`. You can customize:
- Colors
- Fonts
- Spacing
- Breakpoints
- And more

### Vite Configuration

The Vite configuration is in `vite.config.ts`. You can modify:
- Build options
- Development server settings
- Plugins

## License

This project is private.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
