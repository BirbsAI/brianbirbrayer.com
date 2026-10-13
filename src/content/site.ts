/**
 * Single source of truth for site content.
 * Everything here comes from Brian's resume (public/Brian-Birbrayer-Resume.pdf).
 * Items marked TODO need Brian's input; leave them `null` and the UI hides them.
 */

export const site = {
  name: "Brian Birbrayer",
  nickname: "Birbs",
  title: "Full Stack Developer",
  tagline: "C#/.NET · GitHub & Azure DevOps · AI/ML",
  location: "New York & Florida — Remote / Hybrid",
  url: "https://brianbirbrayer.com",
  resumePdf: "/Brian-Birbrayer-Resume.pdf",

  links: {
    email: "brayer0409@gmail.com",
    linkedin: "https://www.linkedin.com/in/brian-birbrayer",
    website: "https://birbs.ai",
    /** TODO(Brian): add your GitHub profile URL, e.g. "https://github.com/<username>". Hidden while null. */
    github: null as string | null,
  },

  /** TODO(Brian): drop a headshot in /public (e.g. /headshot.jpg) and set the path. Hidden while null. */
  headshot: null as string | null,

  summary:
    "Full Stack Developer with a B.S. in Computer Science and a strong AI/ML foundation built in Python with the standard ML toolset. At Optum / UnitedHealth Group, builds and ships production C#/.NET web applications and APIs. Works across both GitHub and Azure DevOps, having helped migrate the team from one to the other. Fluent with modern AI developer tools, including daily use of Claude Code and GitHub Copilot.",

  skills: [
    { group: "Languages", items: ["C#", "Python", "TypeScript", "SQL", "JavaScript", "Java", "HTML / CSS", "C / C++"] },
    { group: "Frameworks & Libraries", items: [".NET / ASP.NET Core", "React", "Next.js", "Tailwind CSS"] },
    { group: "Machine Learning", items: ["NumPy", "Pandas", "scikit-learn", "PyTorch", "TensorFlow / Keras"] },
    { group: "Cloud & DevOps", items: ["Microsoft Azure", "Vercel", "GitHub", "GitHub Actions", "Azure DevOps", "Git", "CI/CD"] },
    { group: "AI Tools", items: ["Anthropic (Claude) SDK", "Claude Code (CLI)", "Cowork", "GitHub Copilot"] },
    { group: "Databases", items: ["PostgreSQL (Supabase)", "MySQL"] },
    { group: "Tools & Platforms", items: ["Visual Studio", "Postman", "CLI"] },
  ],

  experience: [
    {
      role: "Developer",
      company: "Solstice Benefits, Inc.",
      via: "contracted via Optum | UnitedHealth Group",
      period: "2024 – Present",
      bullets: [
        "Design, develop, and deploy production web APIs and full-stack features in C#/.NET within a large healthcare-technology environment.",
        "Helped migrate the team’s applications from Azure DevOps to GitHub — moving repositories, rebuilding CI/CD pipelines as GitHub Actions workflows, and re-establishing branching and release processes with minimal disruption.",
        "Own day-to-day source control, pull requests, and deployments through GitHub and GitHub Actions within an Agile delivery process.",
      ],
    },
    {
      role: "QA Engineer",
      company: "Solstice Benefits, Inc.",
      via: "contracted via UnitedHealth Group",
      period: "2023 – 2024",
      bullets: [
        "Authored and executed test plans to validate functionality and surface defects before release.",
        "Partnered with developers to reproduce, document, and verify fixes, building deep product and codebase knowledge that led to a development role.",
      ],
    },
  ],

  projects: [
    {
      name: "birbs.ai — AI Idea-Intake Agent",
      kind: "Personal Project",
      url: "https://birbs.ai",
      stack: ["Next.js / TypeScript", "React", "Anthropic (Claude) SDK", "Supabase (Postgres)", "Vercel"],
      bullets: [
        "Built and shipped a full-stack web app where an AI agent (Anthropic SDK) runs a guided intake — asking clarifying questions to shape a visitor’s rough idea into a structured brief, then routing it straight to a submission queue with no account required.",
        "Engineered a server-only chat API with per-IP rate limiting, backed by Supabase Postgres with row-level security.",
      ],
    },
  ],

  education: {
    degree: "B.S. in Computer Science",
    school: "Milwaukee School of Engineering",
    period: "2016 – 2022",
    focus:
      "Devoted the final years of the program to artificial intelligence and machine learning, working primarily in Python with NumPy, Pandas, scikit-learn, PyTorch, and TensorFlow / Keras.",
    coursework: [
      "Introduction to Machine Learning",
      "Machine Learning",
      "Introduction to Deep Learning",
      "Artificial Intelligence",
      "Algorithms & Advanced Data Structures",
    ],
    extras: ["Minor: Mathematics", "Varsity Ice Hockey (NCAA), 2016–2018"],
  },
} as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
