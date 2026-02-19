import { getAboutMe } from "@/lib/queries/about"
import { MarkdownRenderer } from "@/components/portfolio/markdown-renderer"
import { Separator } from "@/components/ui/separator"

export default async function AboutPage() {
    const aboutMe = await getAboutMe()

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    About Me
                </h1>
                <Separator className="bg-border/30" />
            </div>

            {aboutMe ? (
                <MarkdownRenderer content={aboutMe.content} />
            ) : (
                <p className="text-muted-foreground">
                    Under Development, Sorry.
                </p>
            )}
        </div>
    )
}
