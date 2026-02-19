import type { Technology } from "@/lib/generated/prisma/client"

export type TechInfo = {
    label: string
    color: string
}

export const TECHNOLOGY_MAP: Record<Technology, TechInfo> = {
    TYPESCRIPT: { label: "TypeScript", color: "#3178C6" },
    JAVASCRIPT: { label: "JavaScript", color: "#F7DF1E" },
    PYTHON: { label: "Python", color: "#3776AB" },
    GO: { label: "Go", color: "#00ADD8" },
    RUST: { label: "Rust", color: "#DEA584" },
    JAVA: { label: "Java", color: "#ED8B00" },
    CPP: { label: "C++", color: "#00599C" },
    C: { label: "C", color: "#A8B9CC" },
    REACT: { label: "React", color: "#61DAFB" },
    NEXTJS: { label: "Next.js", color: "#FFFFFF" },
    VUEJS: { label: "Vue.js", color: "#4FC08D" },
    ANGULAR: { label: "Angular", color: "#DD0031" },
    SVELTE: { label: "Svelte", color: "#FF3E00" },
    NODEJS: { label: "Node.js", color: "#339933" },
    EXPRESS: { label: "Express", color: "#FFFFFF" },
    NESTJS: { label: "NestJS", color: "#E0234E" },
    DJANGO: { label: "Django", color: "#092E20" },
    FLASK: { label: "Flask", color: "#FFFFFF" },
    FASTAPI: { label: "FastAPI", color: "#009688" },
    POSTGRESQL: { label: "PostgreSQL", color: "#4169E1" },
    MYSQL: { label: "MySQL", color: "#4479A1" },
    MONGODB: { label: "MongoDB", color: "#47A248" },
    REDIS: { label: "Redis", color: "#DC382D" },
    SQLITE: { label: "SQLite", color: "#003B57" },
    PRISMA: { label: "Prisma", color: "#2D3748" },
    DOCKER: { label: "Docker", color: "#2496ED" },
    KUBERNETES: { label: "Kubernetes", color: "#326CE5" },
    AWS: { label: "AWS", color: "#FF9900" },
    GCP: { label: "GCP", color: "#4285F4" },
    AZURE: { label: "Azure", color: "#0078D4" },
    LINUX: { label: "Linux", color: "#FCC624" },
    GIT: { label: "Git", color: "#F05032" },
    GRAPHQL: { label: "GraphQL", color: "#E10098" },
    REST: { label: "REST", color: "#6BA539" },
    GRPC: { label: "gRPC", color: "#244C5A" },
    TAILWINDCSS: { label: "Tailwind CSS", color: "#06B6D4" },
    CSS: { label: "CSS", color: "#1572B6" },
    HTML: { label: "HTML", color: "#E34F26" },
    FIREBASE: { label: "Firebase", color: "#FFCA28" },
    SUPABASE: { label: "Supabase", color: "#3ECF8E" },
    VERCEL: { label: "Vercel", color: "#FFFFFF" },
    NGINX: { label: "Nginx", color: "#009639" },
    RABBITMQ: { label: "RabbitMQ", color: "#FF6600" },
    KAFKA: { label: "Kafka", color: "#231F20" },
    ELASTICSEARCH: { label: "Elasticsearch", color: "#005571" },
    TERRAFORM: { label: "Terraform", color: "#7B42BC" },
    GITHUB_ACTIONS: { label: "GitHub Actions", color: "#2088FF" },
} as const

export const TECHNOLOGY_OPTIONS = Object.entries(TECHNOLOGY_MAP).map(
    ([key, info]) => ({
        value: key as Technology,
        label: info.label,
        color: info.color,
    })
)
