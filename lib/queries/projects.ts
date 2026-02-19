import { prisma } from "@/lib/db"

export async function getProjects() {
    return prisma.project.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })
}

export async function getFeaturedProjects(take?: number) {
    return prisma.project.findMany({
        where: { featured: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        ...(take ? { take } : {}),
    })
}

export async function getAllProjectTechnologies() {
    const projects = await prisma.project.findMany({
        select: { technologies: true },
    })
    return [...new Set(projects.flatMap((p) => p.technologies))]
}

export async function getProjectBySlug(slug: string) {
    return prisma.project.findUnique({ where: { slug } })
}

export async function getProjectById(id: string) {
    return prisma.project.findUnique({ where: { id } })
}
