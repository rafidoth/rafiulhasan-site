"use server"

import { prisma } from "@/lib/db"
import type { Technology } from "@/lib/generated/prisma/client"
import { revalidatePath } from "next/cache"

export type ProjectFormData = {
    title: string
    slug: string
    description: string
    content: string
    technologies: Technology[]
    githubUrl: string
    liveUrl: string
    featured: boolean
    order: number
}

export type ActionResult = {
    success: boolean
    error?: string
}

export async function createProject(
    data: ProjectFormData
): Promise<ActionResult> {
    try {
        await prisma.project.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content,
                technologies: data.technologies,
                githubUrl: data.githubUrl || null,
                liveUrl: data.liveUrl || null,
                featured: data.featured,
                order: data.order,
            },
        })
        revalidatePath("/")
        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        return { success: true }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to create project"
        return { success: false, error: message }
    }
}

export async function updateProject(
    id: string,
    data: ProjectFormData
): Promise<ActionResult> {
    try {
        await prisma.project.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content,
                technologies: data.technologies,
                githubUrl: data.githubUrl || null,
                liveUrl: data.liveUrl || null,
                featured: data.featured,
                order: data.order,
            },
        })
        revalidatePath("/")
        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        return { success: true }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to update project"
        return { success: false, error: message }
    }
}

export async function deleteProject(id: string): Promise<ActionResult> {
    try {
        await prisma.project.delete({ where: { id } })
        revalidatePath("/")
        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        return { success: true }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to delete project"
        return { success: false, error: message }
    }
}
