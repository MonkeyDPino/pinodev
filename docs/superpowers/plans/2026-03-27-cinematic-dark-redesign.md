# Cinematic Dark Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the pinodev portfolio with a Cinematic Dark visual system — glassmorphism cards, ambient glow blobs, scroll-reveal animations, Syne + Space Grotesk typography, a new Contact section, a full-screen mobile nav overlay, and a three-column footer.

**Architecture:** All changes are purely frontend (SCSS + TSX). A new `useScrollReveal` hook wires `IntersectionObserver` to CSS classes. One new component (`Contact`) is created. All other changes are SCSS rewrites and TSX tweaks on existing components.

**Tech Stack:** React 18, TypeScript, SCSS (with `@use`), Vite, react-i18next, PrimeReact (used minimally — Timeline removed in Experience)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Modify | Add Google Fonts preconnect + link tags |
| `src/styles/variables.scss` | Modify | Add glass tokens, glow values, deepen `$primary-color` |
| `src/index.scss` | Modify | Global font-family, `.reveal`, `.stagger-children`, reduced-motion |
| `src/App.scss` | Modify | `.bg-blob` ambient blob styles, ensure content z-index |
| `src/App.tsx` | Modify | Add blob divs, add `<Contact />`, wrap content in relative z-index |
| `src/hooks/useScrollReveal.ts` | Create | IntersectionObserver hook returning a ref |
| `src/components/HeaderSection/HeaderSection.tsx` | Modify | Add optional `onClick?: () => void` prop |
| `src/components/Header/Header.tsx` | Modify | JP monogram, fix isOpen state, full-screen overlay mobile nav, add Contact nav link |
| `src/components/Header/Header.scss` | Modify | Glass backdrop, `.header__logo`, full-screen overlay + stagger animation |
| `src/components/LanguageSwitcher/LanguageSwitcher.scss` | Modify | Glassmorphism toggle pill |
| `src/components/Home/Home.scss` | Modify | Full-viewport hero, Syne heading, orbital ring animation |
| `src/components/Experience/Experience.tsx` | Modify | Replace PrimeReact Timeline with custom glassmorphism cards + scroll reveal |
| `src/components/Experience/Experience.scss` | Modify | Glassmorphism card styles |
| `src/components/Projects/Projects.tsx` | Modify | Add `useScrollReveal` + stagger indices |
| `src/components/Projects/Projects.scss` | Modify | Glassmorphism card, hover lift, Syne title |
| `src/components/AboutMe/AboutMe.scss` | Modify | Glow ring on profile photo |
| `src/components/Technologies/Technologies.tsx` | Modify | Add `useScrollReveal` + stagger indices per category |
| `src/components/Technologies/Technologies.scss` | Modify | Glassmorphism chip items |
| `src/components/Certifications/Certifications.tsx` | Modify | Add `useScrollReveal` + stagger indices |
| `src/components/Certifications/Certifications.scss` | Modify | Glassmorphism cards (deepen background, add blur) |
| `src/components/Contact/Contact.tsx` | Create | Split-layout contact form with console.log submit |
| `src/components/Contact/Contact.scss` | Create | Grid layout, glass form panel, input focus states |
| `src/components/Footer/Footer.tsx` | Modify (full rewrite) | Three-column footer with brand, links, contact info |
| `src/components/Footer/Footer.scss` | Modify (full rewrite) | Three-column grid, contact icon pills, bottom bar |
| `src/locales/en.json` | Modify | Add `nav_contact` + all `contact_*` keys |
| `src/locales/es.json` | Modify | Add `nav_contact` + all `contact_*` keys |

---

## Task 1: Visual Foundation — Variables, Fonts, Global CSS

**Files:**
- Modify: `index.html`
- Modify: `src/styles/variables.scss`
- Modify: `src/index.scss`

- [ ] **Step 1: Add Google Fonts to `index.html`**

Open `index.html` (project root). Inside `<head>`, after the existing `<title>` tag, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Add glass tokens and glow values to `variables.scss`**

In `src/styles/variables.scss`, change `$primary-color` and add new tokens at the end:

```scss
// Change this existing line:
$primary-color: rgb(2, 2, 3);

// Add after the existing spacing scale:
// Glassmorphism system
$glass-bg:         rgba(255, 255, 255, 0.04);
$glass-border:     rgba(255, 255, 255, 0.09);
$glass-bg-dim:     rgba(255, 255, 255, 0.025);
$glass-border-dim: rgba(255, 255, 255, 0.06);

// Glow values
$glow-teal-soft: rgba(59, 218, 212, 0.12);
$glow-teal-med:  rgba(59, 218, 212, 0.20);
$glow-lime-soft: rgba(187, 216, 58, 0.08);

// Extra spacing token
$space-10: 40px;
```

- [ ] **Step 3: Add global font-family and animation classes to `index.scss`**

Append to the end of `src/index.scss`:

```scss
// Typography
body {
  font-family: 'Space Grotesk', sans-serif;
}

h1, h2, .title2, .nickname {
  font-family: 'Syne', sans-serif;
}

// Scroll reveal animations
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

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
  .reveal,
  .stagger-children > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

- [ ] **Step 4: Verify dev server compiles without errors**

```bash
npm run dev
```

Expected: dev server starts, no SCSS compilation errors in terminal.

- [ ] **Step 5: Commit**

```bash
git add index.html src/styles/variables.scss src/index.scss
git commit -m "design: add Syne/SpaceGrotesk fonts, glass tokens, reveal animation classes"
```

---

## Task 2: Ambient Blobs + App Shell

**Files:**
- Modify: `src/App.scss`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add blob styles to `App.scss`**

Append to `src/App.scss`:

```scss
// Ambient background blobs
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
  background: radial-gradient(circle, rgba(59, 218, 212, 0.10) 0%, transparent 70%);
}

.bg-blob--lime {
  width: 500px;
  height: 500px;
  bottom: 20%;
  left: -150px;
  background: radial-gradient(circle, rgba(187, 216, 58, 0.07) 0%, transparent 70%);
}

// Ensure all page content sits above blobs
.section,
.header,
footer {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 2: Add blobs to `App.tsx`**

In `src/App.tsx`, add the two blob divs as the first children inside `<PrimeReactProvider>`:

```tsx
function App() {
  return (
    <PrimeReactProvider>
      <div className="bg-blob bg-blob--teal" aria-hidden="true" />
      <div className="bg-blob bg-blob--lime" aria-hidden="true" />
      <Header />
      <Home />
      <Experience />
      <Projects />
      <AboutMe />
      <Certifications />
      <Technologies />
      <Footer />
    </PrimeReactProvider>
  );
}
```

- [ ] **Step 3: Verify blobs appear**

```bash
npm run dev
```

Expected: two faint colored glows visible — teal top-right, lime bottom-left. Page content appears above them.

- [ ] **Step 4: Commit**

```bash
git add src/App.scss src/App.tsx
git commit -m "design: add fixed ambient teal/lime glow blobs to app shell"
```

---

## Task 3: `useScrollReveal` Hook

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useScrollReveal.ts`:

```ts
import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: no TypeScript errors related to the new hook.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrollReveal.ts
git commit -m "feat: add useScrollReveal IntersectionObserver hook"
```

---

## Task 4: HeaderSection — Add `onClick` Prop

**Files:**
- Modify: `src/components/HeaderSection/HeaderSection.tsx`

- [ ] **Step 1: Update HeaderSection to accept optional `onClick`**

Replace the entire contents of `src/components/HeaderSection/HeaderSection.tsx`:

```tsx
import "./HeaderSection.scss";

export default function HeaderSection({
  title,
  hash,
  onClick,
}: {
  title: string;
  hash: string;
  onClick?: () => void;
}) {
  return (
    <div className="header__section">
      <a href={`#${hash}`} onClick={onClick}>{title}</a>
    </div>
  );
}
```

- [ ] **Step 2: Verify no regressions**

```bash
npm run dev
```

Expected: header nav still works, links still scroll to sections.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeaderSection/HeaderSection.tsx
git commit -m "feat: add optional onClick prop to HeaderSection"
```

---

## Task 5: Header — Desktop + Mobile Overlay + Nav Link

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.scss`

- [ ] **Step 1: Rewrite `Header.tsx`**

Replace the entire contents of `src/components/Header/Header.tsx`:

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderSection from "../HeaderSection/HeaderSection";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import "./Header.scss";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="header__content">
        <span className="header__logo">JP</span>

        <div className="header__nav">
          <HeaderSection title={t("nav_home")} hash="home" />
          <HeaderSection title={t("nav_experience")} hash="experience" />
          <HeaderSection title={t("nav_projects")} hash="projects" />
          <HeaderSection title={t("nav_about")} hash="about_me" />
          <HeaderSection title={t("nav_contact")} hash="contact" />
          <LanguageSwitcher />
        </div>

        <div className="header__breadcrumb" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <i className="pi pi-times" /> : <i className="pi pi-bars" />}
        </div>
      </div>

      {isOpen && (
        <div className="header__overlay" onClick={close}>
          <div className="header__overlay__content" onClick={e => e.stopPropagation()}>
            <div className="header__overlay__label">MENU</div>
            <nav className="header__overlay__nav">
              <HeaderSection title={t("nav_home")} hash="home" onClick={close} />
              <HeaderSection title={t("nav_experience")} hash="experience" onClick={close} />
              <HeaderSection title={t("nav_projects")} hash="projects" onClick={close} />
              <HeaderSection title={t("nav_about")} hash="about_me" onClick={close} />
              <HeaderSection title={t("nav_contact")} hash="contact" onClick={close} />
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Rewrite `Header.scss`**

Replace the entire contents of `src/components/Header/Header.scss`:

```scss
@use "../../styles/variables.scss" as *;

.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: $header-height;
  background: rgba(2, 2, 3, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  z-index: 10;

  .header__content {
    margin: 0 auto;
    padding: 6px 10px;
    max-width: $max-width-header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $header-height;
  }

  .header__logo {
    font-family: 'Syne', sans-serif;
    font-weight: 900;
    font-size: 1.2rem;
    color: $secondary-color;
    letter-spacing: -0.02em;
  }

  .header__nav {
    display: flex;
    gap: 10px;
    align-items: center;

    .header__section {
      display: inline-block;
    }
  }

  .header__breadcrumb {
    display: none;
    padding: 3px 5px;
    text-align: center;
    cursor: pointer;

    i { font-size: 1.18rem; }
  }
}

// Full-screen overlay
.header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 2, 3, 0.97);
  backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    top: -100px;
    right: -100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 218, 212, 0.10) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(187, 216, 58, 0.07) 0%, transparent 70%);
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

  .header__section a {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: $text-secondary;
    letter-spacing: -0.02em;
    padding: $space-2 0;
    transition: color 0.2s;
    text-decoration: none;
    display: block;

    &:hover { color: $text-primary; }
  }
}

.header__overlay__nav .header__section {
  opacity: 0;
  transform: translateY(16px);
  animation: overlay-item-in 0.4s ease-out forwards;

  @for $i from 1 through 5 {
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

@media screen and (max-width: 768px) {
  .header__breadcrumb {
    display: block !important;
  }

  .header__nav {
    display: none !important;
  }
}
```

- [ ] **Step 3: Verify header renders correctly**

```bash
npm run dev
```

Expected: desktop shows `JP` monogram + nav links including Contact. Mobile (<768px) shows hamburger. Tapping hamburger opens full-screen overlay with large links and Language switcher. Tapping a link closes the overlay.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header/Header.tsx src/components/Header/Header.scss
git commit -m "design: full-screen overlay mobile nav, JP monogram, glassmorphism header"
```

---

## Task 6: LanguageSwitcher

**Files:**
- Modify: `src/components/LanguageSwitcher/LanguageSwitcher.scss`

- [ ] **Step 1: Replace `LanguageSwitcher.scss`**

Replace the entire contents of `src/components/LanguageSwitcher/LanguageSwitcher.scss`:

```scss
@use "../../styles/variables" as *;

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

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: language switcher shows as a glass pill. Active language is teal-tinted. Inactive is muted. Works in header nav and mobile overlay.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanguageSwitcher/LanguageSwitcher.scss
git commit -m "design: glassmorphism language switcher pill"
```

---

## Task 7: Home Section — Full-Viewport Hero + Orbital Ring

**Files:**
- Modify: `src/components/Home/Home.scss`

- [ ] **Step 1: Replace `Home.scss`**

Replace the entire contents of `src/components/Home/Home.scss`:

```scss
@use "../../styles/variables.scss" as *;

.home {
  display: flex;
  min-height: calc(100vh - #{$header-height});
  align-items: center;

  .info {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $space-3;

    .title1 {
      font-size: 1.1rem;
      color: $secondary-color;
      font-weight: 600;
      font-style: italic;
      font-family: 'Space Grotesk', sans-serif;
    }

    .title2 {
      font-family: 'Syne', sans-serif;
      font-size: 3.5rem;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1.0;
      color: $text-primary;
    }

    .role {
      font-size: 1rem;
      font-weight: 600;
      color: $third-color;
      letter-spacing: 0.04em;
      line-height: 1;
    }

    .description {
      font-size: 1rem;
      color: $text-secondary;
      line-height: 1.6;
      max-width: 420px;
    }

    .content__buttons {
      .buttons {
        margin-top: $space-3;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: $space-5;
        flex-wrap: wrap;
      }

      .social {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: $space-5;

        .button_icon {
          opacity: 0.55;
          transition: opacity 0.2s, transform 0.2s;

          img {
            width: 25px;
            height: 25px;
          }

          &:hover {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      }
    }
  }

  .image {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;

    .profile__image {
      position: relative;
      width: 280px;
      height: 280px;
      transition: transform 0.5s;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        box-shadow:
          0 0 0 2px rgba(59, 218, 212, 0.25),
          0 0 30px rgba(59, 218, 212, 0.20),
          0 0 80px rgba(59, 218, 212, 0.08);
      }

      &::before {
        content: '';
        position: absolute;
        inset: -12px;
        border-radius: 50%;
        border: 1px dashed rgba(59, 218, 212, 0.25);
        animation: orbit-spin 12s linear infinite;
      }

      &:hover {
        transform: scale(1.03);
      }
    }
  }
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .profile__image::before {
    animation: none;
  }
}

@media screen and (max-width: 650px) {
  .home {
    flex-direction: column;
    padding-top: $space-8;
    gap: $space-8;

    .info {
      width: 100%;

      .title2 {
        font-size: 2.2rem;
      }
    }

    .image {
      order: -1;
      width: 100%;

      .profile__image {
        width: 160px;
        height: 160px;
      }
    }
  }
}
```

- [ ] **Step 2: Verify hero**

```bash
npm run dev
```

Expected: hero fills full viewport height minus header. Name is large Syne font. Profile photo has a glow ring and a dashed rotating orbital. Orbital pauses when OS has `prefers-reduced-motion: reduce`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Home/Home.scss
git commit -m "design: full-viewport hero, Syne heading, rotating orbital ring on photo"
```

---

## Task 8: Experience — Replace Timeline with Glassmorphism Cards

**Files:**
- Modify: `src/components/Experience/Experience.tsx`
- Modify: `src/components/Experience/Experience.scss`

- [ ] **Step 1: Rewrite `Experience.tsx`**

Replace the entire contents of `src/components/Experience/Experience.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Experience.scss";

export default function Experience() {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  const events = [
    {
      role: t("experience_0_role"),
      company: "Agentemotor",
      date: "2022 - Present",
      description: t("experience_0_description"),
    },
    {
      role: t("experience_1_role"),
      company: "Universidad Tecnológica de Pereira",
      date: "2021 - 2022",
      description: t("experience_1_description"),
    },
  ];

  return (
    <section className="section experience" id="experience">
      <div className="content">
        <div className="title">{t("experience_title")}</div>
        <div
          className="experience__list reveal stagger-children"
          ref={listRef}
        >
          {events.map((item, index) => (
            <div
              key={index}
              className="experience__card"
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="experience__card__header">
                <div>
                  <span className="role">{item.role}</span>
                  <span className="company"> — {item.company}</span>
                </div>
                <span className="date">{item.date}</span>
              </div>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `Experience.scss`**

Replace the entire contents of `src/components/Experience/Experience.scss`:

```scss
@use "../../styles/variables.scss" as *;

.experience__list {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  margin-top: $space-6;
}

.experience__card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 12px;
  padding: $space-6;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: $border-accent;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 218, 212, 0.08);
  }

  .experience__card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: $space-3;
    margin-bottom: $space-3;
  }

  .role {
    color: $text-primary;
    font-weight: 700;
    font-size: 1rem;
  }

  .company {
    color: $secondary-color;
    font-size: 0.875rem;
  }

  .date {
    background: rgba(59, 218, 212, 0.10);
    border: 1px solid rgba(59, 218, 212, 0.20);
    border-radius: 20px;
    padding: 2px 10px;
    color: $secondary-color;
    font-size: 0.75rem;
    font-family: monospace;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .description {
    color: $text-secondary;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }
}
```

- [ ] **Step 3: Verify experience section**

```bash
npm run dev
```

Expected: two glassmorphism cards replace the PrimeReact timeline. Cards fade+slide up when scrolled into view, staggering 60ms apart. Hover lifts with teal glow border.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience/Experience.tsx src/components/Experience/Experience.scss
git commit -m "design: replace Timeline with glassmorphism cards, add scroll reveal"
```

---

## Task 9: Projects — Glassmorphism Cards + Scroll Reveal

**Files:**
- Modify: `src/components/Projects/Projects.tsx`
- Modify: `src/components/Projects/Projects.scss`

- [ ] **Step 1: Add scroll reveal to `Projects.tsx`**

Replace the entire contents of `src/components/Projects/Projects.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Projects.scss";

export default function Projects() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const projects = [
    {
      title: "Giphy Piece",
      description: t("projects_0_description"),
      technologies: ["React", "Node.js", "MongoDB", "Vercel"],
      thumbnail: "/images/giphy-app.webp",
      link: "https://giphy-pino.vercel.app",
    },
  ];

  return (
    <section className="section projects" id="projects">
      <div className="content">
        <div className="title">{t("projects_title")}</div>
        <div
          className="projects__content reveal stagger-children"
          ref={gridRef}
        >
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project_link"
              style={{ '--i': index } as React.CSSProperties}
            >
              <article className="project_card">
                <div className="project__thumbnail">
                  <img src={project.thumbnail} alt={project.title} />
                </div>
                <div className="project__info">
                  <div className="project__info__title">{project.title}</div>
                  <div className="project__info__description">
                    {project.description}
                  </div>
                  <div className="project__info__technologies">
                    {project.technologies.map((technology, i) => (
                      <span key={i} className="technology">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `Projects.scss`**

Replace the entire contents of `src/components/Projects/Projects.scss`:

```scss
@use "../../styles/variables.scss" as *;

.projects__content {
  margin-top: $space-6;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $space-6;
}

.project_link {
  text-decoration: none;
  display: block;
}

.project_card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(59, 218, 212, 0.30);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 218, 212, 0.08);
  }
}

.project__thumbnail img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.project__info {
  padding: $space-5;
}

.project__info__title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: $text-primary;
}

.project__info__description {
  color: $text-secondary;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-top: $space-2;
}

.project__info__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  margin-top: $space-3;
}

.technology {
  background: rgba(59, 218, 212, 0.08);
  border: 1px solid rgba(59, 218, 212, 0.18);
  color: $secondary-color;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 4px;
  font-family: monospace;
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Expected: project cards show glassmorphism styling, thumbnail fills top, Syne title, teal monospace tech chips. Scroll reveal triggers on entry.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects/Projects.tsx src/components/Projects/Projects.scss
git commit -m "design: glassmorphism project cards with Syne title and scroll reveal"
```

---

## Task 10: AboutMe — Glow Ring on Profile Photo

**Files:**
- Modify: `src/components/AboutMe/AboutMe.scss`

- [ ] **Step 1: Replace `AboutMe.scss`**

Replace the entire contents of `src/components/AboutMe/AboutMe.scss`:

```scss
@use "../../styles/variables.scss" as *;

.about_me__content {
  margin-top: $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-5;

  p {
    color: $text-secondary;
    font-size: 0.95rem;
    line-height: 1.75;
  }

  strong {
    color: $text-primary;
    font-weight: 600;
  }
}

.profile__picture {
  display: flex;
  justify-content: center;
  margin-bottom: $space-3;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow:
      0 0 0 2px rgba(59, 218, 212, 0.25),
      0 0 20px rgba(59, 218, 212, 0.18),
      0 0 50px rgba(59, 218, 212, 0.08);
  }
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Expected: profile photo in About Me has a teal glow ring matching the hero photo style.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutMe/AboutMe.scss
git commit -m "design: glow ring on About Me profile photo"
```

---

## Task 11: Technologies — Glassmorphism Chips + Scroll Reveal

**Files:**
- Modify: `src/components/Technologies/Technologies.tsx`
- Modify: `src/components/Technologies/Technologies.scss`

- [ ] **Step 1: Add scroll reveal to `Technologies.tsx`**

Replace the entire contents of `src/components/Technologies/Technologies.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { svgsConstants } from "../../constants/svgs";
import { svgs } from "../../types/svgs.type";
import "./Technologies.scss";

function TechCategory({ name, nameColor, technologies, index: catIndex }: {
  name: string;
  nameColor?: string;
  technologies: { name: string; image: svgs }[];
  index: number;
}) {
  const { t } = useTranslation();
  const listRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="technology">
      <div className="technology__name" style={{ color: nameColor }}>
        {t(`technologies_category_${name}`)}
      </div>
      <div
        className="technology__list reveal stagger-children"
        ref={listRef}
      >
        {technologies.map((tech, i) => (
          <div
            key={tech.name}
            className="technology__item"
            style={{ '--i': i } as React.CSSProperties}
          >
            <img src={svgsConstants[tech.image]} alt={tech.name} />
            <div>{tech.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Technologies() {
  const technologies: {
    name: string;
    nameColor?: string;
    technologies: { name: string; image: svgs }[];
  }[] = [
    {
      name: "frontend",
      nameColor: "#53f399",
      technologies: [
        { name: "HTML", image: "html" },
        { name: "CSS", image: "css" },
        { name: "JavaScript", image: "javascript" },
        { name: "TypeScript", image: "typescript" },
        { name: "React", image: "react" },
        { name: "Sass", image: "sass" },
        { name: "Tailwind", image: "tailwind" },
      ],
    },
    {
      name: "backend",
      nameColor: "#ffc136",
      technologies: [
        { name: "Node.js", image: "nodejs" },
        { name: "Python", image: "python" },
        { name: "PostgreSQL", image: "postgresql" },
        { name: "MongoDB", image: "mongodb" },
        { name: "Express.js", image: "express" },
        { name: "Docker", image: "docker" },
      ],
    },
    {
      name: "tools",
      nameColor: "#f5965a",
      technologies: [
        { name: "AWS", image: "aws" },
        { name: "Npm", image: "npm" },
        { name: "Postman", image: "postman" },
        { name: "Terminal", image: "terminal" },
        { name: "VScode", image: "vscode" },
      ],
    },
  ];

  return (
    <section className="section technologies" id="technologies">
      <div className="content">
        <div className="title">{t("technologies_title")}</div>
        <div className="technologies__content">
          <article className="technologies__content__list">
            {technologies.map((tech, index) => (
              <TechCategory key={tech.name} {...tech} index={index} />
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `Technologies.scss`**

Replace the entire contents of `src/components/Technologies/Technologies.scss`:

```scss
@use "../../styles/variables.scss" as *;

.technologies__content__list {
  margin-top: $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-10;
}

.technology__name {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: $space-4;
}

.technology__list {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

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
  min-width: 72px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: $border-accent;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 12px rgba(59, 218, 212, 0.08);
  }

  img {
    width: 32px;
    height: 32px;
  }

  div {
    color: $text-secondary;
    font-size: 0.7rem;
    text-align: center;
  }
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Expected: tech items are glass chips with icon + name. Each category's chips stagger in when scrolled into view.

- [ ] **Step 5: Commit**

```bash
git add src/components/Technologies/Technologies.tsx src/components/Technologies/Technologies.scss
git commit -m "design: glassmorphism tech chips, per-category scroll reveal stagger"
```

---

## Task 12: Certifications — Glassmorphism Cards

**Files:**
- Modify: `src/components/Certifications/Certifications.tsx`
- Modify: `src/components/Certifications/Certifications.scss`

- [ ] **Step 1: Add scroll reveal to `Certifications.tsx`**

Replace the entire contents of `src/components/Certifications/Certifications.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Certifications.scss";

export default function Certifications() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLElement>();

  const certifications = [
    {
      name: "Systems and Computer Engineering - Universidad Tecnológica de Pereira",
      description: t("certifications_0_description"),
      link: "https://drive.google.com/file/d/1jCxd31DtJvMZhq6dY6m17JTouOe4Azjh/view?usp=sharing",
      date: "2019 - 2024",
    },
    {
      name: "Python Data Structures - University of Michigan",
      description: t("certifications_1_description"),
      link: "https://drive.google.com/file/d/1UPztyTsnUnd7OuKXb3sxDuSnUPnSWGSO/view?usp=sharing",
      date: "2020",
    },
    {
      name: "Programming Skills - Universidad de Antioquia",
      description: t("certifications_2_description"),
      link: "https://drive.google.com/file/d/1164MDZckr6mvy-LDCfvr9iK-34MZb6k5/view?usp=sharing",
      date: "2021",
    },
    {
      name: "Web Application Development - Universidad de Antioquia",
      description: t("certifications_3_description"),
      link: "https://drive.google.com/file/d/1jSdNX-ZlHEPFfsfWIHKT-3rU1JpjQz1S/view?usp=sharing",
      date: "2021",
    },
  ];

  return (
    <section className="section certifications" id="certifications">
      <div className="content">
        <div className="title">{t("certifications_title")}</div>
        <article
          className="certifications__content__list reveal stagger-children"
          ref={gridRef}
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="certifications__content__list__item"
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="certifications__content__list__item__name">
                {cert.name}
              </div>
              <div className="certifications__content__list__item__date">
                {cert.date}
              </div>
              <div className="certifications__content__list__item__description">
                {cert.description}
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="certifications__content__list__item__link"
              >
                <i className="pi pi-external-link"></i>
              </a>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `Certifications.scss`**

Replace the entire contents of `src/components/Certifications/Certifications.scss`:

```scss
@use "../../styles/variables.scss" as *;

.certifications__content__list {
  margin-top: $space-8;
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: $space-5;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media screen and (max-width: 305px) {
    grid-template-columns: 1fr;
  }
}

.certifications__content__list__item {
  padding: $space-5;
  border-radius: 12px;
  background: $glass-bg;
  border: 1px solid $glass-border;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: $border-accent;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 218, 212, 0.08);
  }
}

.certifications__content__list__item__name {
  font-size: 1rem;
  font-weight: 700;
  color: $text-primary;
  line-height: 1.3;
}

.certifications__content__list__item__date {
  display: inline-block;
  margin-top: $space-2;
  font-size: 0.75rem;
  color: $text-muted;
  font-family: monospace;
  letter-spacing: 0.05em;
}

.certifications__content__list__item__description {
  font-size: 0.875rem;
  color: $text-secondary;
  line-height: 1.6;
  margin: $space-3 0 $space-4;
  flex: 1;
}

.certifications__content__list__item__link {
  display: block;
  margin-top: auto;
  text-align: center;
  color: $secondary-color;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid $border-accent;
  border-radius: 30px;
  padding: $space-2 $space-4;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: rgba(59, 218, 212, 0.08);
    color: $secondary-color-dark;
  }
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Expected: certification cards are glassmorphism, stagger in when scrolled into view, hover lifts with teal glow.

- [ ] **Step 4: Commit**

```bash
git add src/components/Certifications/Certifications.tsx src/components/Certifications/Certifications.scss
git commit -m "design: glassmorphism certification cards with scroll reveal"
```

---

## Task 13: Contact Section (New)

**Files:**
- Create: `src/components/Contact/Contact.tsx`
- Create: `src/components/Contact/Contact.scss`
- Modify: `src/locales/en.json`
- Modify: `src/locales/es.json`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add i18n keys to `en.json`**

Open `src/locales/en.json` and add these keys (alongside existing ones):

```json
"nav_contact": "Contact",
"contact_title": "Contact",
"contact_cta_pre": "Let's work",
"contact_cta_accent": "together.",
"contact_cta_sub": "Have a project in mind or want to talk? I'd love to hear from you.",
"contact_field_name": "Name",
"contact_field_email": "Email",
"contact_field_subject": "Subject",
"contact_field_message": "Message",
"contact_placeholder_name": "Your name",
"contact_placeholder_email": "your@email.com",
"contact_placeholder_subject": "What's this about?",
"contact_placeholder_message": "Tell me about your project...",
"contact_submit": "Send Message"
```

- [ ] **Step 2: Add i18n keys to `es.json`**

Open `src/locales/es.json` and add these keys:

```json
"nav_contact": "Contacto",
"contact_title": "Contacto",
"contact_cta_pre": "Trabajemos",
"contact_cta_accent": "juntos.",
"contact_cta_sub": "¿Tienes un proyecto en mente o quieres hablar? Me encantaría escucharte.",
"contact_field_name": "Nombre",
"contact_field_email": "Correo",
"contact_field_subject": "Asunto",
"contact_field_message": "Mensaje",
"contact_placeholder_name": "Tu nombre",
"contact_placeholder_email": "tu@correo.com",
"contact_placeholder_subject": "¿De qué se trata?",
"contact_placeholder_message": "Cuéntame sobre tu proyecto...",
"contact_submit": "Enviar mensaje"
```

- [ ] **Step 3: Create `src/components/Contact/Contact.tsx`**

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Contact.scss";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLDivElement>();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
  };

  return (
    <section className="section contact" id="contact">
      <div className="content">
        <div className="title">{t("contact_title")}</div>
        <div
          className="contact__grid reveal stagger-children"
          ref={gridRef}
        >
          {/* Left: CTA + contact info */}
          <div className="contact__cta" style={{ '--i': 0 } as React.CSSProperties}>
            <h2 className="contact__cta__heading">
              {t("contact_cta_pre")}{" "}
              <span className="contact__cta__accent">{t("contact_cta_accent")}</span>
            </h2>
            <p className="contact__cta__sub">{t("contact_cta_sub")}</p>
            <ul className="contact__info">
              <li>
                <span className="contact__info__icon contact__info__icon--teal">@</span>
                <a href="mailto:juanrespolo@gmail.com">juanrespolo@gmail.com</a>
              </li>
              <li>
                <span className="contact__info__icon contact__info__icon--lime">☎</span>
                <a href="https://wa.me/573233927516" target="_blank" rel="noreferrer">
                  +57 323 392 7516
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <div className="contact__form__row">
              <div className="contact__field">
                <label htmlFor="contact-name">{t("contact_field_name")}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact_placeholder_name")}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-email">{t("contact_field_email")}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={t("contact_placeholder_email")}
                />
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="contact-subject">{t("contact_field_subject")}</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder={t("contact_placeholder_subject")}
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message">{t("contact_field_message")}</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t("contact_placeholder_message")}
              />
            </div>
            <button type="submit" className="contact__submit">
              {t("contact_submit")} →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/Contact/Contact.scss`**

```scss
@use "../../styles/variables.scss" as *;

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: $space-12;
  margin-top: $space-8;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

// Left column
.contact__cta {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.contact__cta__heading {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: $text-primary;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0;
}

.contact__cta__accent {
  color: $secondary-color;
}

.contact__cta__sub {
  color: $text-secondary;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.contact__info {
  list-style: none;
  padding: 0;
  margin: $space-2 0 0;
  display: flex;
  flex-direction: column;
  gap: $space-3;

  li {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  a {
    color: $text-secondary;
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: $text-primary;
    }
  }
}

.contact__info__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  flex-shrink: 0;

  &--teal {
    background: rgba(59, 218, 212, 0.10);
    border: 1px solid rgba(59, 218, 212, 0.20);
    color: $secondary-color;
  }

  &--lime {
    background: rgba(187, 216, 58, 0.08);
    border: 1px solid rgba(187, 216, 58, 0.15);
    color: $third-color;
  }
}

// Right column — form
.contact__form {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 12px;
  padding: $space-8;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: $space-5;
}

.contact__form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-5;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: $space-2;

  label {
    color: $text-muted;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  input,
  textarea {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid $glass-border;
    border-radius: 6px;
    padding: $space-3 $space-4;
    color: $text-primary;
    font-size: 0.875rem;
    font-family: 'Space Grotesk', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    resize: none;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      border-color: $border-accent;
      box-shadow: 0 0 0 3px rgba(59, 218, 212, 0.08);
    }
  }
}

.contact__submit {
  background: linear-gradient(90deg, $secondary-color, $secondary-color-dark);
  border: none;
  border-radius: 6px;
  padding: $space-4 $space-8;
  color: rgb(2, 2, 3);
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  cursor: pointer;
  align-self: flex-end;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}
```

- [ ] **Step 5: Add `<Contact />` to `App.tsx`**

In `src/App.tsx`, add the import and insert `<Contact />` between `<AboutMe />` and `<Certifications />`:

```tsx
import Contact from "./components/Contact/Contact";

// JSX order:
<AboutMe />
<Contact />
<Certifications />
<Technologies />
```

- [ ] **Step 6: Verify contact section**

```bash
npm run dev
```

Expected: Contact section appears between About Me and Certifications. Left shows CTA and contact info. Right is a glass form with Name/Email side-by-side, Subject, Message, Send button. Submitting logs to console. Nav header shows "Contact" link.

- [ ] **Step 7: Commit**

```bash
git add src/components/Contact/Contact.tsx src/components/Contact/Contact.scss src/locales/en.json src/locales/es.json src/App.tsx
git commit -m "feat: add Contact section with glassmorphism form and i18n"
```

---

## Task 14: Footer — Three-Column Redesign

**Files:**
- Modify: `src/components/Footer/Footer.tsx`
- Modify: `src/components/Footer/Footer.scss`

- [ ] **Step 1: Rewrite `Footer.tsx`**

Replace the entire contents of `src/components/Footer/Footer.tsx`:

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
              <a
                href="https://www.linkedin.com/in/juan-pino-vidal"
                target="_blank"
                rel="noreferrer"
                className="footer__social-icon"
                aria-label="LinkedIn"
              >
                <img src={svgsConstants.linkedin} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/MonkeyDPino"
                target="_blank"
                rel="noreferrer"
                className="footer__social-icon"
                aria-label="GitHub"
              >
                <img src={svgsConstants.github} alt="GitHub" />
              </a>
              <a
                href="https://www.instagram.com/juan.pino.02"
                target="_blank"
                rel="noreferrer"
                className="footer__social-icon"
                aria-label="Instagram"
              >
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
              <a href="#contact">Contact</a>
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
                <a href="https://wa.me/573233927516" target="_blank" rel="noreferrer">
                  +57 323 392 7516
                </a>
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

- [ ] **Step 2: Rewrite `Footer.scss`**

Replace the entire contents of `src/components/Footer/Footer.scss`:

```scss
@use "../../styles/variables.scss" as *;

.footer {
  background: rgb(2, 2, 3);
  border-top: 1px solid $border-subtle;
  margin-top: $space-16;
  position: relative;
  z-index: 1;
}

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

  img {
    width: 22px;
    height: 22px;
  }

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
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
    transition: color 0.2s, padding-left 0.2s;

    &::before {
      content: '› ';
      color: $secondary-color;
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover {
      color: $text-primary;

      &::before {
        opacity: 1;
      }
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

    &:hover {
      color: $text-primary;
    }
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
    background: rgba(59, 218, 212, 0.10);
    border: 1px solid rgba(59, 218, 212, 0.20);
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
```

- [ ] **Step 3: Verify footer**

```bash
npm run dev
```

Expected: footer shows three columns — pinodev logo + tagline + socials | Navigate links with `›` on hover | Email + WhatsApp with icon circles. Bottom bar has copyright left and "Made with ♥" right. Stacks to single column on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer/Footer.tsx src/components/Footer/Footer.scss
git commit -m "design: three-column footer with brand, quick links, and contact info"
```

---

## Task 15: Final Build Check

- [ ] **Step 1: Run full TypeScript + build check**

```bash
npm run build 2>&1
```

Expected: zero TypeScript errors. Build completes successfully with output in `dist/`.

- [ ] **Step 2: Run linter**

```bash
npm run lint 2>&1
```

Expected: no errors. Warnings about `any` types or unused vars should be fixed if present.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Open browser at the URL shown. Check:
- Fonts load (Syne on headings, Space Grotesk on body)
- Ambient blobs visible
- Hero fills viewport, orbital ring animates
- All sections reveal on scroll
- Mobile menu overlay opens/closes
- Contact form logs to console on submit
- Footer three columns display correctly
- Language switcher switches both language and all contact strings

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "design: cinematic dark redesign — final build verification"
```
