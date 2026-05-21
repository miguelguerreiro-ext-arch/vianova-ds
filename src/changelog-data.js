export const CHANGELOG = [
  {
    "sha": "2c19998",
    "iso": "2026-05-20T18:24:36+01:00",
    "title": "Fix blank prod page: stop using lucide-react/dynamic chunked imports",
    "body": "Vite chunked lucide-react's createLucideIcon into a separate file whose\ntop-level forwardRef call ran before the main bundle had exported the\nhelper, throwing 'e is not a function' on load and leaving the page blank.\n\nReplace DynamicIcon with <img> referencing lucide-static SVGs from\njsDelivr CDN. Bundle drops from 1947 tiny chunks (492KB main + per-icon\nfiles) to a single 297KB chunk. Icon list is now a static JS array\ngenerated from dynamicIconImports."
  },
  {
    "sha": "236556f",
    "iso": "2026-05-20T18:08:56+01:00",
    "title": "Add Logo, Shadow sections and expand Iconography to full Lucide library",
    "body": "- New Logo section with 4 full-lockup and 3 symbol-only variants\n  (original, white-text, white, black) — gradient structure preserved\n  across white/black variants with two-tone shape fills\n- New Shadow section with 6 Tailwind elevation tokens and Figma-style\n  detail chips (X, Y, Blur, Spread, Color, Type)\n- Iconography now exposes the full Lucide library (1947 icons) via\n  lazy DynamicIcon with search and click-to-copy JSX tag; stroke 1.33px\n- Typography: 14 size groups × 9 weights, collapsible\n- Color: zinc-only semantic tokens (light/dark), teal-700 dark primary,\n  per-token Tailwind variable alias display"
  },
  {
    "sha": "9d8a234",
    "iso": "2026-05-20T11:35:40+01:00",
    "title": "Add Tailwind CSS v4 palette as CSS variables and wire semantic tokens",
    "body": "Define all 244 Tailwind color variables (--tw-{family}-{shade}) once in\n:root, then replace every raw HSL/OKLCH value across all 6 themes with\nthe nearest Tailwind variable reference (computed via RGB Euclidean distance).\n\nNotable mappings (closest match, not always exact):\n- Light --primary:       teal-700  (#0F766E, Δ12)\n- Dark  --primary:       emerald-400 (#34D399, Δ30) — closest in palette\n- Aisin --primary:       fuchsia-500\n- HERE  --primary:       teal-300\n- Syntax colors resolve to exact Tailwind matches across all themes"
  },
  {
    "sha": "082daf0",
    "iso": "2026-05-20T11:19:02+01:00",
    "title": "Add click-to-copy hex on color swatches",
    "body": "Semantic token swatches compute the live hex from the CSS variable at\nclick time (works across all themes), then copy to clipboard and flash\nthe hex value over the swatch for 1.5s. Tailwind palette chips copy\ntheir hardcoded hex directly and show a ✓ checkmark on click."
  },
  {
    "sha": "c797e1b",
    "iso": "2026-05-20T10:45:19+01:00",
    "title": "Sync foundations reference page with Figma VIP-DS PROD",
    "body": "- Color: add 5 missing semantic tokens (accent-foreground, card-foreground,\n  destructive-foreground, input, ring) and align usage descriptions to Figma copy\n- Color: add collapsible Tailwind CSS v4 palette section (22 families × 11 shades)\n- Radius: rename tokens from radius/rounded-* to radius/* matching Figma variables\n- Motion: rename duration tokens to motion/duration/* and easing labels to\n  motion/easing/default and motion/easing/enter"
  },
  {
    "sha": "dc20f30",
    "iso": "2026-05-05T16:23:09+01:00",
    "title": "Fix logo path resolution and color swatch CSS vars",
    "body": "- Sidebar: import logo as module so Vite resolves the base path correctly\n- index.html: use %BASE_URL% for favicon href\n- ColorSection: fix var(token) → var(--token) so swatches render"
  },
  {
    "sha": "5906327",
    "iso": "2026-05-05T15:52:14+01:00",
    "title": "Update logo to new V-shape DS mark",
    "body": ""
  },
  {
    "sha": "00ba6a8",
    "iso": "2026-05-05T13:47:50+01:00",
    "title": "Add DS logo as favicon and sidebar brand mark",
    "body": ""
  },
  {
    "sha": "97f0ac0",
    "iso": "2026-05-05T13:28:14+01:00",
    "title": "Make CustomDatePicker fully theme-responsive using CSS tokens",
    "body": "Replaced all hardcoded dark colors with semantic CSS variables so the\ncomponent adapts across all 6 themes (light, dark, dark-stone, dark-slate,\naisin, here). Also removed the unused RangeSlider component."
  },
  {
    "sha": "3eedecc",
    "iso": "2026-05-05T11:00:44+01:00",
    "title": "Update design tokens: 6 themes, theme switcher, new color section",
    "body": "- index.css: new semantic tokens (HSL/oklch), 6 themes (light, dark,\n  dark-stone, dark-slate, aisin, here), add syntax-string/number/property,\n  remove vn-brand\n- App.jsx: replace binary dark toggle with multi-theme string state\n- Sidebar.jsx: replace moon/sun button with theme dropdown select,\n  fix --vn-brand → --primary for wordmark\n- ColorSection.jsx: CSS-variable-backed swatches (theme-responsive),\n  add syntax highlighting group, remove hardcoded hex values"
  },
  {
    "sha": "41022cb",
    "iso": "2026-05-05T10:41:33+01:00",
    "title": "Date picker: calendars above, distribution below (no slider); update Figma embed node",
    "body": "- Calendar is now the primary date selection tool (top)\n- Data distribution histogram is a read-only visualization below (no competing slider)\n- Calendar selection highlights the corresponding bars in the histogram\n- Figma embed updated to the rebuilt component node (17:2) with Tokens variables"
  },
  {
    "sha": "214a60a",
    "iso": "2026-05-05T10:05:05+01:00",
    "title": "Restructure date picker: histogram above calendars, remove calendar→slider sync",
    "body": "Slider is now the primary exploration tool (above, syncs to calendars).\nCalendar is the secondary refinement tool (below, no longer moves the slider)."
  },
  {
    "sha": "2baefb7",
    "iso": "2026-05-04T16:39:10+01:00",
    "title": "Add X/Y axes to data distribution histogram",
    "body": ""
  },
  {
    "sha": "20bd3f2",
    "iso": "2026-05-04T16:26:52+01:00",
    "title": "Add month/year dropdown pickers to both calendar headers",
    "body": ""
  },
  {
    "sha": "abdfb80",
    "iso": "2026-05-04T16:13:24+01:00",
    "title": "Add Preview / Code / Figma tabs to all component frames",
    "body": ""
  },
  {
    "sha": "fc317bf",
    "iso": "2026-05-04T16:04:52+01:00",
    "title": "Initial commit — Vianova design system",
    "body": ""
  }
]
