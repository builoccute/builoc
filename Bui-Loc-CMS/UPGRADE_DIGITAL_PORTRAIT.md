# Bui Loc CMS — Digital Portrait Upgrade

This package continues from the previously working cinematic build and keeps the existing authentication/CMS backend intact.

## Public experience
- Dedicated cinematic About page at `/gioi-thieu` using the CMS page content plus selected journey milestones.
- Dedicated Services experience at `/dich-vu` with six service groups, process section, editable CMS content and contact CTA.
- New visual archive at `/thu-vien`; it automatically collects public images from projects, activities, galleries, posts and CMS page blocks, with a responsive masonry layout and lightbox.
- Home page now includes Services and Visual Archive previews.
- Global Ctrl/Cmd + K quick navigation, back-to-top control, scroll progress and ambient motion system.
- Theme-aware glow, glass, grid, grain, pointer light, tilt and marquee layers.
- Responsive behavior and `prefers-reduced-motion` fallback retained.

## Bui Loc CMS
- Appearance Studio V2 extends the existing five presets.
- New controls: visual mode, hero style, glow intensity, glass blur, film grain, ambient grid, pointer aura, depth/tilt and marquee.
- New theme fields are optional and merged with defaults, so older saved theme documents remain compatible.

## Deployment
Use the existing Cloudflare Workers Static Assets settings:
- Build: `npm run build`
- Deploy: `npx wrangler deploy`
- Root: `Bui-Loc-CMS`

No `_redirects` file is required or included.
