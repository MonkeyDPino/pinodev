# Cinematic Dark Portfolio Redesign

**Date:** 2026-03-27
**Status:** Approved
**Scope:** Full visual redesign of pinodev portfolio — styling, layout, typography, and animation. No content changes, no new sections, no new dependencies beyond Google Fonts.

---

## Decisions Made

| Decision | Choice |
|---|---|
| Design direction | Cinematic Dark |
| Hero layout | Split — text left, glowing photo right |
| Content card style | Glassmorphism |
| Animation | Section fade+slide + staggered card entrances |

---

## 1. Visual System

### Colors
Extend `src/styles/variables.scss`. Background deepens from `rgb(15,23,42)` to `rgb(2,2,3)` (`#020203`). All existing brand tokens (`$secondary-color`, `$third-color`, surfaces, text, borders) are kept. Add:

```scss
// Glassmorphism system
$glass-bg:     rgba(255, 255, 255, 0.04);
$glass-border: rgba(255, 255, 255, 0.09);
$glass-bg-dim: rgba(255, 255, 255, 0.025);
$glass-border-dim: rgba(255, 255, 255, 0.06);

// Glow values (used in box-shadow / radial-gradient)
$glow-teal-soft:  rgba(59, 218, 212, 0.12);
$glow-teal-med:   rgba(59, 218, 212, 0.20);
$glow-lime-soft:  rgba(187, 216, 58, 0.08);
```

### Typography
Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Apply in `index.scss` (global):
```scss
body {
  font-family: 'Space Grotesk', sans-serif;
}
h1, h2, .title2, .nickname {
  font-family: 'Syne', sans-serif;
}
```

### Ambient Background Blobs
Two `position: fixed` divs in `App.tsx`, behind all content (`z-index: 0`), pointer-events none. All page content gets `position: relative; z-index: 1`.

```tsx
// In App.tsx, inside PrimeReactProvider, before <Header>
<div className="bg-blob bg-blob--teal" aria-hidden="true" />
<div className="bg-blob bg-blob--lime" aria-hidden="true" />
```

```scss
// In App.scss
.bg-blob {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(80px);
}
.bg-blob--teal {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -150px;
  background: radial-gradient(circle, rgba(59,218,212,0.10) 0%, transparent 70%);
}
.bg-blob--lime {
  width: 500px;
  height: 500px;
  bottom: 20%;
  left: -150px;
  background: radial-gradient(circle, rgba(187,216,58,0.07) 0%, transparent 70%);
}
```

---

## 2. Animation System

### Shared hook: `useScrollReveal`
Create `src/hooks/useScrollReveal.ts`. Uses `IntersectionObserver` to add class `visible` to observed elements when they enter the viewport (threshold: 0.1).

```ts
// src/hooks/useScrollReveal.ts
import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}
```

### Global animation classes (`index.scss`)

```scss
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.visible { opacity: 1; transform: translateY(0); }
}

// Stagger children: set --i as inline style on each child
.stagger-children > * {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: calc(var(--i, 0) * 60ms);
}
.stagger-children.visible > * {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .stagger-children > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

### Usage pattern
Each section wraps its content container with `useScrollReveal` and applies `reveal` + `stagger-children` classes. Each child card gets `style={{ '--i': index } as React.CSSProperties}`.

---

## 3. Header

**File:** `src/components/Header/Header.tsx`

- Remove `Profile` import, replace with `<span className="header__logo">JP</span>`
- Replace the `isOpen` state with a proper `const [isOpen, setIsOpen] = useState(false)`
- When `isOpen` is true, render a `<div className="header__overlay">` that covers the full screen (portaled via a wrapping div, or just absolutely positioned and `z-index: 100`)
- Close overlay when a nav link is clicked (pass `onClick={() => setIsOpen(false)}` to each `HeaderSection` inside the overlay)
- Hamburger becomes an `✕` when open (already implemented, keep as-is)

**Overlay structure:**
```tsx
{isOpen && (
  <div className="header__overlay" onClick={() => setIsOpen(false)}>
    <div className="header__overlay__content" onClick={e => e.stopPropagation()}>
      <div className="header__overlay__label">MENU</div>
      <nav className="header__overlay__nav">
        <HeaderSection title={t("nav_home")} hash="home" onClick={() => setIsOpen(false)} />
        <HeaderSection title={t("nav_experience")} hash="experience" onClick={() => setIsOpen(false)} />
        <HeaderSection title={t("nav_projects")} hash="projects" onClick={() => setIsOpen(false)} />
        <HeaderSection title={t("nav_about")} hash="about_me" onClick={() => setIsOpen(false)} />
      </nav>
      <LanguageSwitcher />
    </div>
  </div>
)}
```

Note: `HeaderSection` already handles hash navigation. The `onClick` prop threads through to close the overlay after navigation.

**File:** `src/components/Header/Header.scss`

Desktop changes:
- `background` → `rgba(2, 2, 3, 0.85)` + `backdrop-filter: blur(16px)`
- `border-bottom` → `1px solid rgba(255, 255, 255, 0.07)`
- `.header__logo`: `font-family: 'Syne'; font-weight: 900; font-size: 1.2rem; color: $secondary-color; letter-spacing: -0.02em`

Mobile overlay (replaces `.header__nav_responsive`):
```scss
.header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 2, 3, 0.97);
  backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  // Ambient blobs inside overlay
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    top: -100px;
    right: -100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,218,212,0.10) 0%, transparent 70%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    bottom: -60px;
    left: -60px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(187,216,58,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
}

.header__overlay__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-2;
  position: relative;
  z-index: 1;
}

.header__overlay__label {
  color: $text-muted;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  margin-bottom: $space-4;
}

.header__overlay__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-2;

  // Override HeaderSection styles inside overlay for big type
  .header__section a {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: $text-secondary;
    letter-spacing: -0.02em;
    padding: $space-2 0;
    transition: color 0.2s;

    &:hover { color: $text-primary; }
  }
}

// Stagger-in animation for overlay links
.header__overlay__nav .header__section {
  opacity: 0;
  transform: translateY(16px);
  animation: overlay-item-in 0.4s ease-out forwards;

  @for $i from 1 through 4 {
    &:nth-child(#{$i}) { animation-delay: #{$i * 60}ms; }
  }
}

@keyframes overlay-item-in {
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .header__overlay__nav .header__section {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Note on `HeaderSection`:** The component currently accepts `title` and `hash` props. Add an optional `onClick?: () => void` prop that fires after the hash link is clicked.

---

## 4. Home Section

**File:** `src/components/Home/Home.scss`

- `.home` min-height: `calc(100vh - 70px)` (full viewport hero)
- `.title2` → `font-family: 'Syne'; font-size: 3.5rem; font-weight: 900; letter-spacing: -0.04em`
- `.title1` → keeps teal + italic, add `font-family: 'Space Grotesk'`
- `.role` → `color: $third-color`

**Photo ring** — `.profile__image` changes:
- Remove `border-radius: 50%` from `img`; apply to the wrapper instead
- Add a pseudo `::before` orbital ring:

```scss
.profile__image {
  position: relative;
  width: 280px;
  height: 280px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow:
      0 0 0 2px rgba(59,218,212,0.25),
      0 0 30px rgba(59,218,212,0.20),
      0 0 80px rgba(59,218,212,0.08);
  }

  &::before {
    content: '';
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 1px dashed rgba(59,218,212,0.25);
    animation: orbit-spin 12s linear infinite;
  }
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .profile__image::before { animation: none; }
}
```

**Scroll reveal:** `Home` applies `useScrollReveal` to `.home`, adds class `reveal`. `.info > *` children each get `style={{ '--i': index }}` via wrapping elements.

---

## 5. Experience Section

**File:** `src/components/Experience/Experience.tsx`
- Replace PrimeReact `<Timeline>` with a custom `<div className="experience__list stagger-children reveal">` and manually map `events` to glassmorphism card divs.
- Remove `Timeline` import.

**Card structure per item:**
```tsx
<div className="experience__card" style={{ '--i': index } as React.CSSProperties}>
  <div className="experience__card__header">
    <div>
      <span className="role">{item.role}</span>
      <span className="company">{item.company}</span>
    </div>
    <span className="date">{item.date}</span>
  </div>
  <p className="description">{item.description}</p>
</div>
```

**File:** `src/components/Experience/Experience.scss`

```scss
.experience__list { display: flex; flex-direction: column; gap: $space-5; margin-top: $space-6; }

.experience__card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 12px;
  padding: $space-6;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: $border-accent;
    box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(59,218,212,0.08);
  }

  .role { color: $text-primary; font-weight: 700; font-size: 1rem; }
  .company { color: $secondary-color; font-size: 0.875rem; margin-left: $space-2; }
  .date {
    background: rgba(59,218,212,0.10);
    border: 1px solid rgba(59,218,212,0.20);
    border-radius: 20px;
    padding: 2px 10px;
    color: $secondary-color;
    font-size: 0.75rem;
    font-family: monospace;
    white-space: nowrap;
  }
  .description { color: $text-secondary; font-size: 0.9rem; line-height: 1.6; margin-top: $space-3; }
}
```

`useScrollReveal` applied to `.experience__list`.

---

## 6. Projects Section

**File:** `src/components/Projects/Projects.scss`

`.project_card` becomes a glassmorphism panel:
```scss
.project_card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(59,218,212,0.30);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(59,218,212,0.08);
  }
}
.project__thumbnail img { width: 100%; height: 180px; object-fit: cover; }
.project__info { padding: $space-5; }
.project__info__title { font-family: 'Syne'; font-weight: 800; font-size: 1.1rem; color: $text-primary; }
.project__info__description { color: $text-secondary; font-size: 0.875rem; line-height: 1.6; margin-top: $space-2; }
.project__info__technologies { display: flex; flex-wrap: wrap; gap: $space-2; margin-top: $space-3; }
.technology {
  background: rgba(59,218,212,0.08);
  border: 1px solid rgba(59,218,212,0.18);
  color: $secondary-color;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 4px;
  font-family: monospace;
}
```

`useScrollReveal` + `stagger-children` on `.projects__content`.

---

## 7. Technologies Section

**File:** `src/components/Technologies/Technologies.scss`

`.technology__item` becomes a glassmorphism chip:
```scss
.technology__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-2;
  padding: $space-4;
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: $border-accent;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 12px rgba(59,218,212,0.08);
  }

  img { width: 32px; height: 32px; }
  div { color: $text-secondary; font-size: 0.7rem; }
}
```

`useScrollReveal` + `stagger-children` on `.technology__list` per category.

---

## 8. AboutMe Section

**File:** `src/components/AboutMe/AboutMe.scss`

`.profile__picture img` gets same glow ring treatment as hero (matching `box-shadow`, smaller size ~150px). Content paragraphs wrapped in a glassmorphism panel.

---

## 9. LanguageSwitcher

**File:** `src/components/LanguageSwitcher/LanguageSwitcher.scss`

The current solid teal-bordered pill is replaced with a glassmorphism toggle. The container becomes a glass panel; the active button gets a filled teal inner pill, the inactive button is muted text only.

```scss
.language-switcher {
  display: flex;
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 6px;
  padding: 2px;
  backdrop-filter: blur(8px);
  gap: 2px;
}

.lang-btn {
  padding: 3px 10px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  color: $text-muted;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.05em;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  &.active {
    background: rgba(59, 218, 212, 0.15);
    color: $secondary-color;
    box-shadow: 0 0 8px rgba(59, 218, 212, 0.15);
  }

  &:not(.active):hover {
    color: $text-secondary;
    background: rgba(255, 255, 255, 0.04);
  }
}
```

No changes to `LanguageSwitcher.tsx`.

---

## 10. Certifications

Apply glassmorphism card system to certification items (same `$glass-bg`, `$glass-border`, `border-radius: 12px`, hover lift).

---

## 11. Footer Redesign

**Layout:** Three-column grid — Brand | Quick Links | Contact. Bottom bar with copyright.

**File:** `src/components/Footer/Footer.tsx` — full rewrite:

```tsx
import "./Footer.scss";
import { svgsConstants } from "../../constants/svgs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">

          {/* Column 1: Brand */}
          <div className="footer__brand">
            <span className="footer__logo">pinodev</span>
            <p className="footer__tagline">
              Building fast, thoughtful software that people enjoy.
            </p>
            <div className="footer__socials">
              <a href="https://www.linkedin.com/in/juan-pino-vidal" target="_blank" rel="noreferrer" className="footer__social-icon">
                <img src={svgsConstants.linkedin} alt="LinkedIn" />
              </a>
              <a href="https://github.com/MonkeyDPino" target="_blank" rel="noreferrer" className="footer__social-icon">
                <img src={svgsConstants.github} alt="GitHub" />
              </a>
              <a href="https://www.instagram.com/juan.pino.02" target="_blank" rel="noreferrer" className="footer__social-icon">
                <img src={svgsConstants.instagram} alt="Instagram" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__links">
            <span className="footer__col-title">Navigate</span>
            <nav className="footer__nav">
              <a href="#home">Home</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#about_me">About Me</a>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="footer__contact">
            <span className="footer__col-title">Contact</span>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-icon footer__contact-icon--teal">@</span>
                <a href="mailto:juanrespolo@gmail.com">juanrespolo@gmail.com</a>
              </li>
              <li>
                <span className="footer__contact-icon footer__contact-icon--lime">☎</span>
                <a href="https://wa.me/573233927516" target="_blank" rel="noreferrer">+57 323 392 7516</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>© 2026 Juan Pino. All rights reserved.</span>
          <span className="footer__made-with">Made with ♥</span>
        </div>
      </div>
    </footer>
  );
}
```

**File:** `src/components/Footer/Footer.scss` — full rewrite:

```scss
@use "../../styles/variables.scss" as *;

.footer {
  background: rgb(2, 2, 3);
  border-top: 1px solid $border-subtle;
  margin-top: $space-16;

  .footer__content {
    margin: 0 auto;
    max-width: $max-width-header;
    padding: $space-12 $space-6 0;
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: $space-12;
    padding-bottom: $space-12;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: $space-8;
    }
  }

  // Column 1: Brand
  .footer__logo {
    display: block;
    font-family: 'Syne', sans-serif;
    font-weight: 900;
    font-size: 1.3rem;
    color: $secondary-color;
    letter-spacing: -0.02em;
    margin-bottom: $space-3;
  }

  .footer__tagline {
    color: $text-muted;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-bottom: $space-5;
    max-width: 220px;
  }

  .footer__socials {
    display: flex;
    gap: $space-3;
  }

  .footer__social-icon {
    opacity: 0.45;
    transition: opacity 0.2s, transform 0.2s;

    img { width: 22px; height: 22px; }

    &:hover { opacity: 1; transform: translateY(-2px); }
  }

  // Column labels
  .footer__col-title {
    display: block;
    color: $text-muted;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: $space-5;
  }

  // Column 2: Quick links
  .footer__nav {
    display: flex;
    flex-direction: column;
    gap: $space-3;

    a {
      color: $text-secondary;
      font-size: 0.875rem;
      text-decoration: none;
      transition: color 0.2s;

      &::before {
        content: '› ';
        color: $secondary-color;
        opacity: 0;
        transition: opacity 0.2s;
      }

      &:hover {
        color: $text-primary;
        &::before { opacity: 1; }
      }
    }
  }

  // Column 3: Contact
  .footer__contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $space-4;

    li {
      display: flex;
      align-items: center;
      gap: $space-3;
    }

    a {
      color: $text-secondary;
      font-size: 0.8rem;
      text-decoration: none;
      transition: color 0.2s;
      word-break: break-all;
      &:hover { color: $text-primary; }
    }
  }

  .footer__contact-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    flex-shrink: 0;

    &--teal {
      background: rgba(59, 218, 212, 0.1);
      border: 1px solid rgba(59, 218, 212, 0.2);
      color: $secondary-color;
    }

    &--lime {
      background: rgba(187, 216, 58, 0.08);
      border: 1px solid rgba(187, 216, 58, 0.15);
      color: $third-color;
    }
  }

  // Bottom bar
  .footer__bottom {
    border-top: 1px solid $border-subtle;
    padding: $space-5 0 $space-8;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: $text-muted;
      font-size: 0.78rem;
    }

    .footer__made-with {
      color: rgba(59, 218, 212, 0.35);
      font-size: 0.75rem;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      gap: $space-2;
      text-align: center;
    }
  }
}
```

---

## 10. Files Changed

| File | Change |
|---|---|
| `index.html` | Add Google Fonts preconnect + link (root-level, Vite convention) |
| `src/styles/variables.scss` | Add glass tokens + glow values + deepen `$primary-color` |
| `src/index.scss` | Add font-family globals, `.reveal`, `.stagger-children`, `@media prefers-reduced-motion` |
| `src/App.scss` | Add `.bg-blob` styles |
| `src/App.tsx` | Add two ambient blob divs |
| `src/hooks/useScrollReveal.ts` | New file — shared IntersectionObserver hook |
| `src/components/Header/Header.tsx` | JP monogram, fixed isOpen state, full-screen overlay mobile nav |
| `src/components/Header/Header.scss` | Glassmorphism backdrop, full-screen overlay styles with stagger animation |
| `src/components/HeaderSection/HeaderSection.tsx` | Add optional `onClick` prop |
| `src/components/Home/Home.scss` | Full viewport hero, Syne heading, orbital ring animation |
| `src/components/Experience/Experience.tsx` | Replace Timeline with custom glassmorphism cards |
| `src/components/Experience/Experience.scss` | Glassmorphism card styles |
| `src/components/Projects/Projects.scss` | Glassmorphism card, hover lift |
| `src/components/Technologies/Technologies.scss` | Glassmorphism chip items |
| `src/components/AboutMe/AboutMe.scss` | Glow ring on photo, panel wrap |
| `src/components/LanguageSwitcher/LanguageSwitcher.scss` | Glassmorphism toggle pill |
| `src/components/Certifications/Certifications.scss` | Glassmorphism cards |
| `src/components/Footer/Footer.tsx` | Full rewrite — three-column grid with brand, links, contact |
| `src/components/Footer/Footer.scss` | Full rewrite — three-column layout, contact icons, bottom bar |

---

## Out of Scope

- No new sections
- No content/copy changes
- No i18n changes
- No routing changes
- No new npm packages (Google Fonts via CDN only)
- `Profile.tsx` component: becomes orphaned after Header change (AboutMe uses its own inline `<img>`, not Profile). Leave the file in place — do not delete it.
