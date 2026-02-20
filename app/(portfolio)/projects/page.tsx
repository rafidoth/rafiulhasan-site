import { getProjects } from "@/lib/queries/projects"
import { ProjectCard } from "@/components/portfolio/project-card"
import { Separator } from "@/components/ui/separator"
export const revalidate = 1800;
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
                <div className="flex gap-4 flex-col md:flex-row md:flex-wrap">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Sorry, for inconvenience, projects couldn't be pulled due to network issue.
                </p>
            )}
        </div>
    )
}
