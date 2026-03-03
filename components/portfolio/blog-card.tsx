import Link from "next/link"
import type { BlogListItem } from "@/lib/blog-types"
import { LANGUAGE_LABELS } from "@/lib/blog-types"
import { Calendar, User } from "lucide-react"
import { format } from "date-fns"

type BlogCardProps = {
    blog: BlogListItem
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link
            href={`/blogs/${blog.slug}`}
            className="group flex flex-col gap-3 rounded-lg border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {blog.meta.title}
                </h2>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {blog.meta.excerpt}
            </p>

            <div className="mt-auto flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="size-3" />
                        {format(new Date(blog.meta.publishDate), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <User className="size-3" />
                        {blog.meta.author}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                        {blog.meta.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                        {blog.meta.tags.length > 4 && (
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-muted-foreground">
                                +{blog.meta.tags.length - 4}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        {blog.availableLanguages.map((lang) => (
                            <span
                                key={lang}
                                className="inline-flex items-center rounded-full border border-border/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                                {LANGUAGE_LABELS[lang]}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
