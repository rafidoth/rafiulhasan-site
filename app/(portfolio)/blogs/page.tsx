import { getAllBlogs } from "@/lib/blog"
import { BlogCard } from "@/components/portfolio/blog-card"
import { Separator } from "@/components/ui/separator"

export default function BlogsPage() {
    const blogs = getAllBlogs()

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    Blogs
                </h1>
                <Separator className="bg-border/30" />
            </div>

            {blogs.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    No blog posts yet. Stay tuned for articles on software
                    engineering, system design, and more.
                </p>
            )}
        </div>
    )
}
