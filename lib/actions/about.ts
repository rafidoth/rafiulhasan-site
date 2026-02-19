"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import type { ActionResult } from "./projects"

export async function upsertAboutMe(content: string): Promise<ActionResult> {
    try {
        const existing = await prisma.aboutMe.findFirst()
        if (existing) {
            await prisma.aboutMe.update({
                where: { id: existing.id },
                data: { content },
            })
        } else {
            await prisma.aboutMe.create({
                data: { content },
            })
        }
        revalidatePath("/about")
        return { success: true }
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to update about me"
        return { success: false, error: message }
    }
}
