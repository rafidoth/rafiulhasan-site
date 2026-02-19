import { getProjectById } from "@/lib/queries/projects"
import { notFound } from "next/navigation"
import { ProjectForm } from "@/components/cms/project-form"

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params
    const project = await getProjectById(id)

    if (!project) notFound()

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-foreground">
                Edit Project
            </h2>
            <ProjectForm project={project} />
        </div>
    )
}
