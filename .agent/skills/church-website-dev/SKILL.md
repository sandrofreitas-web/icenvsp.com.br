---
name: church-website-dev
description: Guides the development, styling, and database/deployment workflow of the ICE Nova Vida church website (icenvsp.com.br). Use when modifying components, layouts, Supabase database bindings, or testing in localhost.
---

# Church Website Development Skill

This skill governs the development of the ICE Nova Vida website. Follow these rules, architecture, and workflow conventions to ensure development safety, visual alignment, and correct routing.

## 🌿 Branching & Environments

1. **`dev-full` (Localhost)**:
   - **Branch**: `dev-full`
   - **Environment**: Docker container on `http://localhost:3000`
   - **State**: Contains the **full** version with all tabs (`home`, `sobre`, `cultos`, `sermoes`, `eventos`, `contato`, `admin`).
   - **Workflow**: Perform all feature work, styling, debugging, and testing here.
2. **`main` (Production)**:
   - **Branch**: `main`
   - **Environment**: Hostinger Static Site (`https://icenvsp.com.br`)
   - **State**: A **simplified** version currently showing only the `CultosView` tab.
   - **⚠️ Rule**: Do NOT commit or push changes to `main` unless promoting a finalized, approved full version.

## 🎨 Design System (Heritage & Horizon)

Maintain the editorial-corporate hybrid aesthetic:
- **Palette**:
  - Primary Blue: `#007CC3` (interaction / navigation headers)
  - Gold Accent: `#C9A84C` (used sparingly for highlight badges, icons, and CTA text)
  - Surface Background: `#FCF8FF` / `#F8FAFC`
  - Text: `#1A1A2E` (deep navy-carvão)
- **Typography**:
  - Headings: `Playfair Display`
  - Body & UI: `Inter`
- **Border Radius**: Soft rounded corners: `0.25rem` (4px) for buttons/inputs, `0.5rem` (8px) for cards.

## 🗄️ Database & Safety (Supabase)

- **One Database**: Local development and production both query the **same Supabase instance**. Be cautious with schema migrations or admin table edits.
- **Dynamic Fail-safety**: When fetching database records, always check for null/undefined fields and fallback safely to local static values in `src/data.ts`.
- **Safe Property Access**: Always use safe navigation (`?.`) when rendering dynamic properties (e.g., `sermon.title?.[language]`) to avoid runtime UI crashes.

## 🌐 Localization (PT/EN)

- The application is bilingual (`pt` and `en`).
- If adding new UI texts or modifying existing labels, update the `DICTIONARY` object inside `src/data.ts` for both languages.

## 🧪 Verification Checklist

Before finalizing any changes:
1. Ensure Docker is running and hot-reload shows no React runtime console errors.
2. Run TypeScript check: `npm run lint` (`tsc --noEmit`) to verify no compilation errors.
3. Validate layout on mobile widths (below 600px).
