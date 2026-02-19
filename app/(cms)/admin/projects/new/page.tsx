import { ProjectForm } from "@/components/cms/project-form"

export default function NewProjectPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-foreground">
                New Project
            </h2>
            <ProjectForm />
        </div>
    )
}
