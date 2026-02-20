import { ProjectCard } from "./project-card"
import { SecondaryTitle } from "./secondary-title"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/generated/prisma/client"

type FeaturedProjectsSectionProps = {
    projects: Project[]
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
    if (projects.length === 0) return null

    return (
        <section className="relative z-10 flex flex-col gap-2 md:gap-6">
            <div className="flex items-center justify-between">
                <SecondaryTitle>
                    Featured Work
                </SecondaryTitle>
                <Link
                    href="/projects"
                    className="group flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                    View all
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
            <Separator className="bg-border/30" />
            <div className="flex flex-col md:flex-row gap-6 px-2 ">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </section>
    )
}
