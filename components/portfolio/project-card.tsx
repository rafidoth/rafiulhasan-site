import Link from "next/link"
import type { Project } from "@/lib/generated/prisma/client"
import { TechBadge } from "./tech-badge"
import { ExternalLink, Github } from "lucide-react"

type ProjectCardProps = {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="w-[400px] group relative flex flex-col gap-3 rounded-lg border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <Link
                    href={`/projects/${project.slug}`}
                    className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary"
                >
                    {project.title}
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Github className="size-4" />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ExternalLink className="size-4" />
                        </a>
                    )}
                </div>
            </div>
            <Link href={`/projects/${project.slug}`} className="contents">
                <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                    ))}
                    {project.technologies.length > 5 && (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-muted-foreground">
                            +{project.technologies.length - 5}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    )
}
