"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project, Technology } from "@/lib/generated/prisma/client"
import { TECHNOLOGY_OPTIONS } from "@/lib/constants/technologies"
import {
    createProject,
    updateProject,
    type ProjectFormData,
} from "@/lib/actions/projects"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
}

type ProjectFormProps = {
    project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [title, setTitle] = useState(project?.title ?? "")
    const [slug, setSlug] = useState(project?.slug ?? "")
    const [description, setDescription] = useState(
        project?.description ?? ""
    )
    const [content, setContent] = useState(project?.content ?? "")
    const [technologies, setTechnologies] = useState<Technology[]>(
        project?.technologies ?? []
    )
    const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? "")
    const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "")
    const [featured, setFeatured] = useState(project?.featured ?? false)
    const [order, setOrder] = useState(project?.order ?? 0)

    const handleTitleChange = (value: string) => {
        setTitle(value)
        if (!project) {
            setSlug(slugify(value))
        }
    }

    const toggleTech = (tech: Technology) => {
        setTechnologies((prev) =>
            prev.includes(tech)
                ? prev.filter((t) => t !== tech)
                : [...prev, tech]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const data: ProjectFormData = {
            title,
            slug,
            description,
            content,
            technologies,
            githubUrl,
            liveUrl,
            featured,
            order,
        }

        const result = project
            ? await updateProject(project.id, data)
            : await createProject(data)

        if (result.success) {
            router.push("/admin/projects")
            router.refresh()
        } else {
            setError(result.error ?? "Something went wrong")
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Project title"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="project-slug"
                        required
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Short Description</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A brief one-liner about the project"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your project description in Markdown..."
                    className="min-h-[300px] font-mono text-sm"
                    required
                />
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-2">
                    {TECHNOLOGY_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => toggleTech(option.value)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                                technologies.includes(option.value)
                                    ? "border-primary/50 bg-primary/10 text-primary"
                                    : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                            }`}
                        >
                            <span
                                className="size-2 rounded-full"
                                style={{ backgroundColor: option.color }}
                            />
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                        id="githubUrl"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/..."
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                        id="liveUrl"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <Switch
                        id="featured"
                        checked={featured}
                        onCheckedChange={setFeatured}
                    />
                    <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="order">Order</Label>
                    <Input
                        id="order"
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                        className="w-20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit" disabled={loading}>
                    {loading
                        ? "Saving..."
                        : project
                          ? "Update Project"
                          : "Create Project"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/projects")}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
