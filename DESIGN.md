# Vehicle Speeding Guard — Design System

This document describes the visual and interaction system implemented by
`styles.css`. The marketing site is a dependency-free static experience and
must stay visually consistent with the product’s safety-aware purpose.

## 1. Direction

**Concept:** neon cockpit.

The site should feel like a precise instrument panel seen at night: near-black,
compact, readable, and illuminated only where information matters. The custom
speedometer-and-car illustration is the memorable visual; glowing outlines,
technical geometry, and colored status signals support it without competing
with the product message.

### Principles

1. **Information before decoration.** Green, amber, and red communicate
   meaning rather than acting as arbitrary accents.
2. **Fast recognition.** Product purpose, store action, core workflow, and
   safety limits remain obvious at a glance.
3. **Measured claims.** Location and speed-limit data are described as
   estimates or available context, never guarantees.
4. **Original and lightweight.** The hero combines a local generated car
   render with an inline SVG gauge; supporting icons remain inline SVG. The
   site uses no framework, external font, or third-party visual dependency.
5. **One system, two densities.** The homepage is expressive; legal and
   support pages use the same chrome and tokens with quieter content layouts.

## 2. Sources of truth

- `styles.css` defines tokens, components, motion, and responsive behavior.
- `index.html` defines the marketing-page composition and layered hero.
- `hero-car-cutout.png` is the approved transparent graphite-coupe hero render.
- `script.js` enhances the mobile menu and current year.
- `privacy.html`, `privacy-ios.html`, `terms.html`, and `support.html` retain
  their existing content while sharing the redesigned header and footer.
- `app-icon.png` and `favicon.svg` remain approved product assets.

When this document differs from the implementation, update both together.

## 3. Color tokens

The site is dark-only.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#020504` | Primary page background |
| `--paper` | `#07100d` | Content surfaces |
| `--paper-raised` | `#0b1813` | Raised surfaces |
| `--ink` | `#f7fff9` | Headings and high-emphasis text |
| `--muted` | `rgba(231, 247, 237, .72)` | Body and secondary copy |
| `--muted-soft` | `rgba(220, 240, 228, .48)` | Notes and metadata |
| `--green` | `#39f285` | Safe, active, primary action |
| `--caution` | `#ffb936` | Approaching threshold |
| `--red` | `#ff4d57` | Alert and safety limitation |

### Rules

- Green is the only default action color.
- Amber and red are reserved for actual caution or alert meaning.
- Every colored state includes a text label or icon.
- Glows stay low-opacity and never reduce text contrast.

## 4. Typography and hierarchy

- Display: `Bahnschrift Condensed`, then `Aptos Display` and
  `Franklin Gothic Medium`.
- Body: `Aptos`, then `Segoe UI` and system sans-serif.
- Marketing headings use uppercase condensed type.
- Long-form headings use the same family but return to sentence case below
  the page title.
- Body copy stays below approximately 68 characters per line.
- Eyebrows are short uppercase labels with an illuminated horizontal rule.

The hero title uses a two-level lockup: “Vehicle” is smaller and
“Speeding Guard” carries the main weight.

## 5. Layout and components

### Frame

- Maximum width: `1180px`.
- Default desktop gutter: `20px` per side.
- Homepage sections: `88px` vertical padding.
- Default radius: `14px`.
- Main breakpoint for navigation: `980px`.

### Header

- Sticky translucent near-black surface with a thin green light line.
- Compact circular speedometer mark and two-line product wordmark.
- Primary navigation preserves Home, Privacy, iOS Privacy, Terms, and Support.
- Google Play is the only filled navigation action.
- At `980px` and below, links move into the existing accessible menu.

### Hero

- Asymmetric copy-and-illustration grid on wide screens.
- The inline SVG supplies the speedometer, green-to-red gauge arc, needle, and
  explanatory text alternative.
- `hero-car-cutout.png` supplies a low-contrast cinematic coupe with a true
  alpha channel. The stacking order is ambient glow, speed effects, coupe, then
  the complete SVG gauge. The gauge is vertically offset above the roofline so
  the instrument remains prominent without covering the coupe.
- Five asymmetric emerald light trails and a blurred road strip communicate
  forward speed without altering or obscuring the coupe.
- The primary Google Play button uses a custom vector Play mark.
- The secondary button scrolls to the workflow.
- The visual remains visible and responsive on mobile.

### Workflow and features

- Three numbered workflow cards: Measure, Check, Alert.
- Three core-feature cards: Live speed alerts, Speed-limit lookup, Free and
  Pro access.
- Cards use green illuminated borders, one icon, a short heading, and concise
  factual copy.
- Hover lift is limited to five pixels.

### Status philosophy

- Three horizontal instrument rows explain green, amber, and red.
- A colored lamp, icon, label, border, and description communicate every state.
- The desktop signal rail becomes a compact offset rail on mobile.

### Safety and download

- The red safety strip stays in normal reading flow and is never collapsible.
- The closing download band repeats the verified Google Play action.
- App Store and social destinations are omitted until verified links exist.

### Legal and support

- Page titles use a green instrument rail.
- Legal tables of contents are sticky on desktop and static on smaller screens.
- Long sections use rules and open space instead of card stacks.
- Contact boxes share the green illuminated surface treatment.

## 6. Motion

Motion suggests an instrument powering on:

- Hero copy rises into place.
- The SVG enters with a small horizontal offset.
- The gauge needle performs one brief settling movement; it does not simulate
  live telemetry.
- Static light trails and a blurred road texture suggest forward motion without
  adding continuous animation.
- Cards and status rows use a restrained stagger.
- Hover transitions are approximately `180–200ms`.

All nonessential motion is contained in
`@media (prefers-reduced-motion: no-preference)`.

## 7. Accessibility

- Every page includes a visible-on-focus skip link.
- Full pages use semantic `header`, `nav`, `main`, `section`, and `footer`
  landmarks.
- Current navigation uses `aria-current="page"`.
- The mobile button retains `aria-controls` and an accurate
  `aria-expanded` state.
- The menu closes on Escape, outside click, link activation, or return to a
  desktop viewport.
- Interactive controls are at least `44px` high where practical.
- Focus uses a high-contrast green outline and is never removed.
- Meaningful SVG artwork has a title and description; decorative icons use
  `aria-hidden="true"`.
- Layouts must work from `320px` upward without horizontal scrolling.

## 8. Content and verification

Use calm, factual language:

- “estimates speed from device location readings”
- “available road data”
- “based on the driver’s settings”
- “may be inaccurate, delayed, or unavailable”
- “always follow posted signs”

Avoid claims that the app guarantees correct limits, prevents speeding,
replaces vehicle instruments, or ensures legal compliance.

Before release, verify:

- Desktop and mobile layouts at 1440, 1024, 768, 390, and 320 pixels.
- Keyboard access, menu behavior, focus, skip links, and reduced motion.
- All internal links and the verified Google Play destination.
- No browser-console errors or horizontal overflow.
- Readability of legal and support pages after shared-style changes.
