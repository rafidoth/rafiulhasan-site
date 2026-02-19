import { getProjects } from "@/lib/queries/projects"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TECHNOLOGY_MAP } from "@/lib/constants/technologies"
import { DeleteProjectButton } from "@/components/cms/delete-project-button"

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                    Projects
                </h2>
                <Button asChild size="sm">
                    <Link href="/admin/projects/new">New Project</Link>
                </Button>
            </div>

            {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No projects yet. Create your first one.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center justify-between rounded-md border border-border/50 bg-card/50 px-4 py-3"
                        >
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-foreground">
                                        {project.title}
                                    </span>
                                    {project.featured && (
                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies
                                        .slice(0, 4)
                                        .map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-[10px] text-muted-foreground"
                                            >
                                                {TECHNOLOGY_MAP[tech].label}
                                            </span>
                                        ))}
                                    {project.technologies.length > 4 && (
                                        <span className="text-[10px] text-muted-foreground">
                                            +
                                            {project.technologies.length - 4}{" "}
                                            more
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button asChild variant="outline" size="xs">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                    >
                                        Edit
                                    </Link>
                                </Button>
                                <DeleteProjectButton id={project.id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
