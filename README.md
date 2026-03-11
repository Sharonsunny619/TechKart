# TechKart

An e-commerce-style React app where everything — pages, layout, themes, content — is controlled through a single config file. No hardcoded pages, no scattered route definitions. Just update the config and the UI follows.

## Getting Started

```bash
npm install
npm run dev
```

## How It Works

The whole app revolves around one config file: `src/config/app.config.ts`. It defines the site name, nav items, theme values, and every page with its sections. When you want a new page, you just add an entry to the `pages` array in that file. Routes get generated automatically from it.

Each page is basically a list of sections. A section has a `type` (like `"hero"` or `"productGrid"`) and some `props`. The `SectionResolver` component looks up the type in a registry and renders the right component. That's the core pattern — config describes what to show, the resolver figures out how.

Styling works the same way. Colors, spacing, fonts, border radius — all of it comes from the theme object in config. Components read from `ThemeContext` and apply styles accordingly. There's a light/dark toggle in the navbar that swaps between two theme presets defined in `config/themes.ts`.

## Project Structure

```
src/
├── config/           — app config + theme presets
├── context/          — ConfigContext, ThemeContext, UserContext, and a wrapper provider
├── hooks/            — useProducts (filtering/search), useThemeStyles (CSS vars from theme)
├── components/       — generic stuff like Card, Button, Badge, Grid, Navbar
│   └── sections/     — section components (HeroSection, ProductGridSection, etc.)
├── pages/            — just one: ConfigPage, renders whatever the config says
├── data/             — mock products and user data
├── types/            — TypeScript interfaces
└── styles.css        — minimal resets and responsive bits
```

## What's Under the Hood

**React Context** — three separate contexts for config, theme, and user data. Kept them split so a theme change doesn't re-render something that only cares about user info.

**Custom Hooks** — `useProducts` handles product filtering, search, and category selection. `useThemeStyles` takes the theme config and spits out CSS variables and style objects that components can use directly.

**Component Resolver** — `SectionResolver` has a simple object mapping type strings to components. Nothing fancy, just explicit and easy to extend when you need a new section type.

**Dynamic Routing** — routes aren't written by hand. They're generated from `config.pages` at runtime using React Router.

**Reusable Components** — `Card`, `Button`, `Badge`, `Grid` are all generic and prop-driven. They don't know or care which page they're on.

## Adding a New Page

1. Open `src/config/app.config.ts`
2. Add an entry to the `pages` array with a path and a list of sections
3. Use existing section types or register a new one in the resolver
4. That's it — the route and page render automatically

## Dark Mode

There's a theme toggle in the navbar. Themes live in `src/config/themes.ts`. Switching themes updates the context and everything re-styles itself.

## Built With

- React 19 + TypeScript
- Vite
- React Router v7
- Tailwind CSS and Normal CSS
