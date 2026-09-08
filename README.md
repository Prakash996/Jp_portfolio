# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# JP Portfolio

A React portfolio built with Vite. It includes an animated landing experience, profile and skills sections, project and experience views, resume access, contact actions, and responsive navigation.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app is available at `http://localhost:5173/`.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Section Links

The portfolio supports direct links to these sections:

- `http://localhost:5173/#home`
- `http://localhost:5173/#skills`
- `http://localhost:5173/#experience`

The app restores the requested section after the landing experience and normalizes invalid section hashes to `#home`.

## Project Structure

```text
src/
├── components/       Portfolio sections and reusable UI
├── css/               Component-specific styles
├── data/              Portfolio content and personal details
├── store/             Redux store and application state
├── App.jsx            Landing flow and section hash handling
└── main.jsx           React entry point
```

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- Motion
- Lucide React
