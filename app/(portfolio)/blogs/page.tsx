import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export const revalidate = 1800;

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
                system design, and more. Currently I've listed some in my
                <Link
                    href="https://rafiulhasan.notion.site/"
                    target="_blank"
                    className="underline underline-offset-3 mx-2 cursor-pointer text-primary hover:opacity-80"
                >
                    notion blog
                </Link>
                .

            </p>
        </div>
    )
}
