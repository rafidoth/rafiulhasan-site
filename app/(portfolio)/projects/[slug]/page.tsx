import { getProjectBySlug } from "@/lib/queries/projects"
import { notFound } from "next/navigation"
import { MarkdownRenderer } from "@/components/portfolio/markdown-renderer"
import { TechBadge } from "@/components/portfolio/tech-badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
export const revalidate = 1800;
type Props = {
    params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) notFound()

    return (
        <div className="flex flex-col gap-8">
            <Link
                href="/projects"
                className="group flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                Back to projects
            </Link>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-foreground">
                    {project.title}
                </h1>
                <p className="text-base text-muted-foreground">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Github className="size-4" />
                            Source
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ExternalLink className="size-4" />
                            Live
                        </a>
                    )}
                </div>
            </div>

            <Separator className="bg-border/30" />

            <MarkdownRenderer content={project.content} />
        </div>
    )
}
