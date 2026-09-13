import type { CvProfile } from "../types/cv.type";

/**
 * Single source of truth for every language-agnostic CV fact. Components
 * import from here instead of holding their own literal copy — see the
 * `cv-data` capability spec. Translatable prose lives in the locale files and
 * is referenced here only by i18n key (`*Key` fields).
 */
export const cv = {
  fullName: "Juan Esteban Pino Vidal",
  shortName: "Juan Pino",
  location: "Medellín, Colombia",
  nameLines: ["Juan Esteban", "Pino Vidal"],
  email: "juanrespolo@gmail.com",
  phone: "+57 323 392 7516",
  portrait: "/images/profile.webp",

  socials: [
    {
      kind: "linkedin",
      href: "https://www.linkedin.com/in/juan-pino-vidal",
      labelKey: "social_linkedin",
    },
    {
      kind: "github",
      href: "https://github.com/MonkeyDPino",
      labelKey: "social_github",
    },
    {
      kind: "instagram",
      href: "https://www.instagram.com/juan.pino.02",
      labelKey: "social_instagram",
    },
  ],

  cvUrls: {
    en: "https://drive.google.com/file/d/1-CoRG3TYBhG3yUNETM18URDIOI_2vxm-/view?usp=sharing",
    es: "https://drive.google.com/file/d/1aRormKMmnFhqUGz-m2UZaVnH5MvuRo8S/view?usp=sharing",
  },

  stack: [
    { layerKey: "stack_layer_frontend", items: ["react", "nextjs", "typescript"] },
    { layerKey: "stack_layer_backend", items: ["nodejs", "express", "python"] },
    { layerKey: "stack_layer_data", items: ["postgresql", "mongodb"] },
    { layerKey: "stack_layer_cloud", items: ["aws", "docker"] },
    { layerKey: "stack_layer_delivery", items: ["cicd"] },
  ],

  experience: [
    {
      company: "Agentemotor",
      start: "2022-11",
      end: null,
      roleKey: "experience_0_role",
      descriptionKey: "experience_0_description",
      outcomes: [
        { figure: "~200", labelKey: "experience_0_outcome_0" },
        { figure: "~15%", labelKey: "experience_0_outcome_1" },
        { figure: "1", labelKey: "experience_0_outcome_2" },
      ],
    },
    {
      company: "Universidad Tecnológica de Pereira",
      start: "2022-01",
      end: "2022-11",
      roleKey: "experience_1_role",
      descriptionKey: "experience_1_description",
      outcomes: [],
    },
  ],

  projects: [
    {
      kind: "gallery",
      title: "Insurance Quote Comparator",
      descriptionKey: "projects_1_description",
      image: "/images/p_comp_1.webp",
      images: ["/images/p_comp_1.webp"],
      tech: ["react", "vite", "aws", "postgresql", "python"],
    },
    {
      kind: "link",
      title: "Giphy Piece",
      descriptionKey: "projects_0_description",
      image: "/images/giphy-app.webp",
      url: "https://giphy.pinodev.app",
      tech: ["react", "nodejs", "mongodb"],
    },
    {
      kind: "link",
      title: "Pino Blog",
      descriptionKey: "projects_5_description",
      image: "/images/pino-blog.webp",
      url: "https://blog-app.pinodev.app",
      tech: ["nextjs", "nestjs", "postgresql", "docker", "typescript"],
    },
    {
      kind: "gallery",
      title: "Advisor Platform Config",
      descriptionKey: "projects_2_description",
      image: "/images/p_config_1.webp",
      images: [
        "/images/p_config_1.webp",
        "/images/p_config_2.webp",
        "/images/p_config_3.webp",
      ],
      tech: ["react", "vite", "aws", "postgresql", "python"],
    },
    {
      kind: "gallery",
      title: "Customer Insurance Portal",
      descriptionKey: "projects_3_description",
      image: "/images/p_portal_1.webp",
      images: [
        "/images/p_portal_1.webp",
        "/images/p_portal_2.webp",
        "/images/p_portal_3.webp",
        "/images/p_portal_4.webp",
        "/images/p_portal_5.webp",
        "/images/p_portal_6.webp",
      ],
      tech: ["nextjs", "react", "aws", "python", "postgresql"],
    },
    {
      kind: "gallery",
      title: "SOAT Quotation & Payment",
      descriptionKey: "projects_4_description",
      image: "/images/p_soat_1.webp",
      images: [
        "/images/p_soat_1.webp",
        "/images/p_soat_2.webp",
        "/images/p_soat_3.webp",
        "/images/p_soat_4.webp",
      ],
      tech: ["react", "vite", "aws", "postgresql", "python", "postman"],
    },
  ],

  education: [
    {
      issuer: "Universidad Tecnológica de Pereira",
      nameKey: "education_0_name",
      awarded: "2024-07",
      verifyUrl: null,
      statusKey: "education_0_status",
    },
  ],

  certifications: [
    {
      issuer: "Universidad de Antioquia",
      nameKey: "certifications_0_name",
      awarded: "2021-04",
      verifyUrl:
        "https://drive.google.com/file/d/1164MDZckr6mvy-LDCfvr9iK-34MZb6k5/view?usp=sharing",
    },
    {
      issuer: "Universidad de Antioquia",
      nameKey: "certifications_1_name",
      awarded: "2021-04",
      verifyUrl:
        "https://drive.google.com/file/d/1jSdNX-ZlHEPFfsfWIHKT-3rU1JpjQz1S/view?usp=sharing",
    },
    {
      issuer: "University of Michigan (Coursera)",
      nameKey: "certifications_2_name",
      awarded: "2021-04",
      verifyUrl: null,
    },
  ],

  coreSkills: [
    {
      labelKey: "technologies_category_frontend",
      items: ["html", "css", "javascript", "typescript", "react", "nextjs"],
    },
    {
      labelKey: "technologies_category_backend",
      items: ["nodejs", "nestjs", "express", "python", "postgresql", "mongodb", "docker"],
    },
    {
      labelKey: "technologies_category_tools",
      items: ["aws", "git", "github", "vite", "linux", "odoo", "cicd"],
    },
  ],

  extendedSkills: [
    {
      labelKey: "technologies_extended_architecture",
      items: [
        "REST APIs",
        "GraphQL",
        "Microservices",
        "Serverless architecture",
        "Design patterns",
        "Scalable architecture",
        "Automated testing (Jest, Vitest, Cypress)",
        "Clean Architecture",
        "Hexagonal Architecture (ports & adapters)",
        "Dependency injection / inversion",
        "Testable software design",
        "Agile / SCRUM",
        "LaTeX",
      ],
    },
    {
      labelKey: "technologies_extended_platform",
      items: [
        "SQL",
        "Redis / ElastiCache",
        "AWS (Lambda, API Gateway, EC2, ECS, S3, ALB, Cognito)",
        "Kubernetes",
        "Linux",
        "Nginx",
        "GitHub Actions",
        "Git",
        "Odoo",
      ],
    },
    {
      labelKey: "technologies_extended_interface",
      items: [
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vite",
        "Storybook",
        "Claude / Claude Code",
        "LLM APIs (OpenAI, Anthropic)",
        "n8n",
        "LLM agents & orchestration",
        "MCP",
      ],
    },
  ],

  languages: [
    { nameKey: "language_spanish", level: "native" },
    { nameKey: "language_english", level: "b2" },
  ],
} satisfies CvProfile;
