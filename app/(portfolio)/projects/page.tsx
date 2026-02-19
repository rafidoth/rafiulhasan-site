import { getProjects } from "@/lib/queries/projects"
import { ProjectCard } from "@/components/portfolio/project-card"
import { Separator } from "@/components/ui/separator"

export default async function ProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    Projects
                </h1>
                <Separator className="bg-border/30" />
            </div>

            {projects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    No projects yet. Add some through the CMS.
                </p>
            )}
        </div>
    )
}
