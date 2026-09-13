import { svgs } from "../types/svgs.type";

/**
 * Single source of truth for the human-readable label of every icon-registry
 * key. `cv.ts` stores technologies as `svgs` identifiers (so `tsc -b` can
 * verify every tech name has a matching icon); this map recovers the display
 * label components need to render alongside that icon.
 */
export const techLabels: Record<svgs, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  download: "Download",
  aws: "AWS",
  css: "CSS3",
  git: "Git",
  html: "HTML5",
  javascript: "JavaScript",
  mongodb: "MongoDB",
  nodejs: "Node.js",
  npm: "npm",
  postgresql: "PostgreSQL",
  postman: "Postman",
  python: "Python",
  react: "React",
  sass: "Sass",
  terminal: "Terminal",
  typescript: "TypeScript",
  vscode: "VS Code",
  express: "Express",
  docker: "Docker",
  tailwind: "Tailwind CSS",
  instagram: "Instagram",
  vite: "Vite",
  linux: "Linux",
  odoo: "Odoo",
  nextjs: "Next.js",
  nestjs: "NestJS",
  cicd: "CI/CD",
};
