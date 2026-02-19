import { Separator } from "@/components/ui/separator"

export default function BlogsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    Blogs
                </h1>
                <Separator className="bg-border/30" />
            </div>

            <p className="text-muted-foreground">
                Coming soon. Stay tuned for articles on software engineering,
                system design, and more.
            </p>
        </div>
    )
}
