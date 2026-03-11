# TechKart — Config-Driven React Application

A modular React application where UI structure, content, and styles are driven entirely by a configuration file rather than hardcoded into components.

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

### Core Idea: Config as the Source of Truth

The entire application is driven by a single configuration object (`src/config/app.config.ts`). This config defines:

- **Site metadata** — name, navigation items
- **Theme** — colors, spacing, border radius, font family
- **Pages** — each page declares its route path and an ordered list of sections
- **Sections** — each section has a `type` (string key) and `props` (data passed to the component)

To add a new page, you only need to add an entry to the `pages` array in the config. No new components or route declarations are required unless the page uses a section type that hasn't been registered yet.

### Component Resolver

`SectionResolver` maintains a registry (`sectionRegistry`) mapping section type strings to React components. When a page renders, it iterates over its `sections` array and resolves each to the corresponding component, spreading `props` from config.

This is the central architectural pattern — it decouples page structure from component implementation.

### Folder Structure

```
src/
├── config/              # App configuration and theme presets
│   ├── app.config.ts    # Single source of truth for all pages
│   └── themes.ts        # Light and dark theme definitions
├── context/             # React Contexts (config, theme, user)
│   ├── ConfigContext.tsx
│   ├── ThemeContext.tsx
│   ├── UserContext.tsx
│   └── AppProviders.tsx # Composed provider tree
├── hooks/               # Custom hooks with real logic
│   ├── useProducts.ts   # Filtering, search, category logic
│   └── useThemeStyles.ts# Derives CSS vars and style objects from theme
├── components/          # Reusable, generic UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Grid.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── SectionResolver.tsx  # The component resolver
│   └── sections/            # Section-level components (registered in resolver)
│       ├── HeroSection.tsx
│       ├── FeaturedProductsSection.tsx
│       ├── StatsBarSection.tsx
│       ├── PageHeaderSection.tsx
│       ├── ProductGridSection.tsx
│       ├── UserCardSection.tsx
│       └── ProfileDetailsSection.tsx
├── pages/
│   └── ConfigPage.tsx   # Single generic page — renders any config-defined page
├── data/                # Mock data
│   ├── products.ts
│   └── user.ts
├── types/               # TypeScript interfaces
│   ├── config.ts
│   └── data.ts
└── styles.css           # Minimal global CSS (resets, hover effects, responsive)
```

### Mandatory Requirements Checklist

| Requirement | Implementation |
|---|---|
| React Context | Three contexts: `ConfigContext`, `ThemeContext`, `UserContext` — provide config, theme values, and user data respectively |
| Custom Hooks (2+) | `useProducts` (filtering, search, category logic) and `useThemeStyles` (derives CSS variables and style objects from theme config) |
| Reusable Components | `Card`, `Button`, `Badge`, `Grid` — generic, prop-driven, not page-specific |
| Styling From Config | All colors, spacing, border-radius, font-family come from the theme config object; no hardcoded design tokens in components |
| Component Resolver | `SectionResolver` maps config `type` strings to components via a registry object |
| React Router | Routes are generated dynamically from `config.pages` |
| Config-Driven UI | Pages, layout, content, and theme all derived from `app.config.ts` |

### Bonus Features

- **Add a page by editing config only** — Add a new entry to `config.pages` using existing section types and it renders automatically (routes are generated from config)
- **Theme switching** — Light/dark toggle in navbar; themes defined in `config/themes.ts`

### Design Decisions and Trade-offs

**Why inline styles driven by theme, not Tailwind?**
The assessment requires styling to be derived from configuration. Inline styles applied from the theme context object demonstrate this most directly. A thin layer of CSS handles hover effects and responsive breakpoints that inline styles can't express.

**Why a single `ConfigPage` instead of separate page components?**
A single page component that resolves sections from config avoids hardcoded page logic (a listed red flag). Every page is structurally identical — it's just a list of sections. The differentiation lives in config, not in JSX.

**Why a flat section registry instead of dynamic imports?**
For an app of this scale, a static registry is simpler and more explicit. Dynamic imports would add complexity without proportional benefit. The registry is the single place to extend when adding new section types.

**Why separate contexts instead of one big context?**
Separating config, theme, and user data into distinct contexts avoids unnecessary re-renders. Components that only need theme data don't re-render when user data changes.

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router v7
- Plain CSS (no UI libraries)
# TechKart1
