import { prisma } from "@/lib/db"

export async function getAboutMe() {
    return prisma.aboutMe.findFirst()
}
