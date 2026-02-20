import { Londrina_Solid } from "next/font/google"
import { cn } from "@/lib/utils"
import Inventory, { InventoryTechnology } from "./tech-inventory"
import { ReactNode } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
const londrina = Londrina_Solid({
    weight: ["900"]
})

const getGemImage = (imageName: string): ReactNode => {
    return <Image alt={imageName} src={`/${imageName}.png`} width={30} height={30} />
}

const techs: InventoryTechnology[] = [
    {
        title: "Frontend",
        gem: getGemImage("gem1"),
        techs: ["React", "Nextjs", "React Native"],
    },
    {
        title: "Backend",
        gem: getGemImage("gem2"),
        techs: ["Go", "Typescript", "Nodejs", "Express JS", "Nest JS"]
    },
    {
        title: "Database & Message Queues",
        gem: getGemImage("gem3"),
        techs: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ"]
    },
    {
        title: "Cloud & DevOps",
        gem: getGemImage("gem4"),
        techs: ["AWS (EC2, S3, RDS)", "Docker", "Azure", "CI/CD"]
    },
    {
        title: "Tools in my workflow",
        gem: getGemImage("gem5"),
        techs: ["Arch Linux", "Git", "Neovim", "Figma"]

    }
]

export function HeroSection() {
    return (
        <section className="flex px-2 flex-col md:flex-row gap-2 justify-between items-baseline">
            <div className="flex flex-col ">
                <div className="flex flex-col">
                    <h1
                        className={cn(
                            londrina.className,
                            " font-black text-5xl leading-tight md:text-7xl text-white"
                        )}
                    >
                        S Rafiul Hasan
                    </h1>
                    <p className="text-lg text-muted-foreground text-primary font-bold ">
                        Software Engineer | Bangladesh 🇧🇩
                    </p>
                </div>
                <p className="max-w-md leading-relaxed text-foreground ">
                    Building software that matters. I&apos;m a Backend-Focused Full-Stack Developer, I find beauty in building systems that just works.
                </p>
                <Link
                    href="/resume.pdf"
                    download
                    className="transition-opacity hover:opacity-80 my-2"
                >
                    <Button className="flex gap-2 cursor-pointer" variant={"secondary"}>
                        <Image src="/script.png" alt="Download Resume" width={32} height={32} />
                        Download Resume
                    </Button>
                </Link>
            </div>

            <Inventory technology_list={techs} />
        </section>
    )
}
