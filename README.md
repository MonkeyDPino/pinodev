# Juan Pino — Portfolio

Personal portfolio site showcasing my experience, projects, and skills as a Software Engineer specialized in Backend & Cloud.

Live at: **[pinodev.app](https://pinodev.app)**

---

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | React 18 + TypeScript              |
| Build tool | Vite + SWC                         |
| Styling    | SCSS + PrimeReact (lara-dark-blue) |
| i18n       | react-i18next (English / Spanish)  |
| Contact    | EmailJS                            |
| Hosting    | —                                  |

---

## Features

- **Bilingual** — full English/Spanish support with automatic browser language detection
- **Contact form** — sends emails directly from the browser via EmailJS, no backend required
- **Scroll animations** — reveal-on-scroll with staggered children using a custom `useScrollReveal` hook
- **Responsive** — mobile-first layout across all sections

---

## Project Structure

```
src/
├── components/       # One folder per section (component + SCSS)
│   ├── Header/
│   ├── Home/
│   ├── Experience/
│   ├── Projects/
│   ├── AboutMe/
│   ├── Contact/
│   ├── Certifications/
│   ├── Technologies/
│   └── Footer/
├── hooks/            # useScrollReveal, useEmailJS
├── locales/          # en.json, es.json
├── styles/           # variables.scss (shared tokens)
├── assets/           # SVG icons
└── App.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+

### Install & run

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Other commands

```bash
npm run build     # Type-check + production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

---

## Contact

**Juan Esteban Pino**

- Email: juanrespolo@gmail.com
- WhatsApp: +57 323 392 7516
