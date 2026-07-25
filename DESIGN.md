---
name: Heritage & Horizon
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#404751'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#707882'
  outline-variant: '#bfc7d2'
  surface-tint: '#E8F4FB'
  primary: '#00629c'
  on-primary: '#ffffff'
  primary-container: '#007cc3'
  on-primary-container: '#00050e'
  inverse-primary: '#98cbff'
  secondary: '#166397'
  on-secondary: '#ffffff'
  secondary-container: '#86c4fe'
  on-secondary-container: '#005180'
  tertiary: '#755b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c8a74b'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cfe5ff'
  primary-fixed-dim: '#98cbff'
  on-primary-fixed: '#001d33'
  on-primary-fixed-variant: '#004a77'
  secondary-fixed: '#cee5ff'
  secondary-fixed-dim: '#97cbff'
  on-secondary-fixed: '#001d33'
  on-secondary-fixed-variant: '#004a76'
  tertiary-fixed: '#ffe08f'
  tertiary-fixed-dim: '#e6c364'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
  surface-alt: '#F8FAFC'
  text-muted: '#64748B'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

The design system is built for an institution that balances a century of theological tradition with a vibrant, modern community presence. The brand personality is **Solemn yet Welcoming**—it avoids the coldness of purely corporate design and the fleeting nature of trendy consumer apps.

The visual style is **Corporate Modern with Editorial Grace**. It leverages heavy whitespace and high-quality typography (Minimalism) while introducing warmth through gold accents and deep, trustworthy blues. The aesthetic should evoke a sense of permanence, reliability, and spiritual peace. 

Key visual principles:
- **Refinement:** High contrast between serif headings and sans-serif body text.
- **Clarity:** Uncluttered layouts that allow for contemplation.
- **Trust:** A dominant palette of deep blues that suggests institutional stability.

## Colors

The palette is anchored by a triad of blues and a singular metallic accent. **Primary Blue (#007CC3)** serves as the main interactive color, while **Primary Dark (#005A8E)** is reserved for headers, footers, and high-importance institutional backgrounds.

**Gold Accent (#C9A84C)** is used sparingly to denote excellence, sacredness, or call-to-action highlights. It should never be used for large background areas; instead, it acts as a "light" within the interface. 

The neutral palette uses a deep navy-tinted black (**#1A1A2E**) for text to ensure readability while maintaining the "Solemn" tone, avoiding the harshness of pure black. Backgrounds should transition between pure white and **Alt Surface (#F8FAFC)** to define content sections without using heavy borders.

## Typography

This design system employs a classic "Serif for Headlines, Sans for Body" pairing to establish authority and modern legibility.

- **Playfair Display** is used for all "Display" and "Headline" levels. It carries the "Century-old institution" weight. Use "SemiBold" or "Bold" for headers to ensure the thin strokes of the serif remain legible against photographic backgrounds.
- **Inter** is used for all functional text. Its neutral, utilitarian nature provides a clean "Modern" contrast to the serif headers.
- **Labels** (caps/small headers) should use Inter with increased letter spacing to create a sense of organized hierarchy.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a dignified, "book-like" structure, centered on the screen. 

- **Grid:** 12-column system on desktop, 4-column on mobile.
- **Rhythm:** An 8px base unit drives all padding and margins. 
- **White Space:** Generous vertical spacing (**Section Gaps**) is encouraged to give the content "room to breathe," reflecting a peaceful and welcoming environment.
- **Breakpoints:** Mobile (under 600px), Tablet (600px - 1024px), Desktop (1024px+). On mobile, horizontal margins shrink to 16px to maximize reading area.

## Elevation & Depth

To maintain a "Solemn" and "Institutional" feel, this design system avoids aggressive shadows. Depth is primarily communicated through **Tonal Layers**.

- **Surface Levels:** Use `#FFFFFF` for the main content and `#F8FAFC` (Alt Surface) for secondary containers or "well" components.
- **Shadows:** When necessary (e.g., for dropdowns or modals), use an **Ambient Shadow** that is extremely diffused: `0px 10px 30px rgba(26, 26, 46, 0.05)`. The tint should always be a low-opacity version of the Text Main color.
- **Dividers:** Use subtle 1px strokes in `#E8F4FB` (Primary Light) to separate content without creating visual noise.

## Shapes

The shape language is **Soft (0.25rem)**. 

Sharp corners (0px) are too aggressive and "Brutalist," while fully rounded/pill shapes (3) are too "Playful/Tech." The **Soft** roundedness level provides a gentle, modern touch that feels approachable while retaining the structured, rectangular integrity of traditional institutional documents. 

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Cards:** 8px (0.5rem) corner radius for a slightly softer feel on larger surface areas.

## Components

### Buttons
- **Primary:** Background `#007CC3`, Text `#FFFFFF`. Solid fill, no gradient.
- **Secondary:** Background `Transparent`, Border 1px `#007CC3`, Text `#007CC3`.
- **CTA/Accent:** Background `#C9A84C`, Text `#FFFFFF`. Used for "Join Us" or "Donate."

### Input Fields
- Use a white background with a 1px border of `#64748B` (Text Muted). 
- On focus, the border changes to `#007CC3` with a subtle 2px glow of the same color at 10% opacity.

### Cards
- Use for event listings or ministries. Background `#FFFFFF` with a 1px border of `#E8F4FB`. 
- No shadow by default; on hover, apply the Ambient Shadow defined in the Elevation section and a subtle 2px upward shift.

### Chips/Badges
- Small labels for categories (e.g., "Youth," "Missions"). Use `#E8F4FB` background with `#005A8E` text. Use uppercase Inter labels at 12px.

### Lists
- Use Custom icons (e.g., a small gold chevron or cross) instead of standard bullet points to reinforce institutional identity.
