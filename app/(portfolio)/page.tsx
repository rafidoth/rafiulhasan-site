import { Londrina_Solid, Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"
import { getFeaturedProjects, getAllProjectTechnologies } from "@/lib/queries/projects"
import { ProjectCard } from "@/components/portfolio/project-card"
import { TechBadge } from "@/components/portfolio/tech-badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import { Tooltip } from "@/components/ui/tooltip"
import { SecondaryTitle } from "@/components/portfolio/secondary-title"
import { Button } from "@/components/ui/button"
const londrina = Londrina_Solid({
    weight: ["900"]
})

const getGemImage = (imageName: string): ReactNode => {
    return <Image alt={imageName} src={`/${imageName}.png`} width={30} height={30} />
}



const techs = [
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

export default async function SummaryPage() {
    const [featuredProjects, allTechnologies] = await Promise.all([
        getFeaturedProjects(4),
        getAllProjectTechnologies(),
    ])

    return (
        <div className="flex flex-col gap-8">
            <section className="flex gap-2 justify-between items-baseline">
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
                        Building software that matters. I'm a Backend-Focused Full-Stack Developer, I find beauty in building systems that just works.
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <SecondaryTitle>INVENTORY</SecondaryTitle>
                    {techs.map(t => {
                        return <div key={t.title} className="flex flex-wrap gap-2">
                            {t.gem} {t.techs.map(tt => {
                                return <span key={tt} className="hover:text-primary cursor-default">{tt}</span>
                            })}
                        </div>
                    })}

                </div>
            </section>
            {featuredProjects.length > 0 && (
                <section className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <SecondaryTitle>
                            Featured Work
                        </SecondaryTitle>
                        <Link
                            href="/projects"
                            className="group flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                            View all
                            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    <Separator className="bg-border/30" />
                    <div className="flex gap-6">
                        {featuredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}
                    </div>
                </section>
            )}
            <footer className="flex items-center justify-between py-6 border-t border-border/30">
                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/rafidoth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        GitHub
                    </Link>
                    <Link
                        href="https://linkedin.com/in/rafiulhasan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        LinkedIn
                    </Link>
                    <Link
                        href="mailto:srafiulhasan@gmail.com"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        Mail
                    </Link>
                </div>
                <Link
                    href="/resume.pdf"
                    download
                    className="transition-opacity hover:opacity-80"
                >
                    <Button className="flex gap-2 cursor-pointer" variant={"outline"}>

                        <Image src="/script.png" alt="Download Resume" width={32} height={32} />
                        Download Resume
                    </Button>
                </Link>
            </footer>
        </div>


    )
}
