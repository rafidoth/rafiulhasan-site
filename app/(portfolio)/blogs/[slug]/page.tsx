import { notFound } from "next/navigation"
import {
    getAllBlogSlugs,
    getBlogBySlug,
    getAvailableLanguages,
    type Language,
    type BlogMeta,
} from "@/lib/blog"
import { BlogLanguageToggle } from "@/components/portfolio/blog-language-toggle"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params
    const availableLanguages = getAvailableLanguages(slug)

    if (availableLanguages.length === 0) {
        notFound()
    }

    // Default to English, fall back to Bengali
    const defaultLang: Language = availableLanguages.includes("en")
        ? "en"
        : "bn"

    // Load both language versions (null if not available)
    const enPost = getBlogBySlug(slug, "en")
    const bnPost = getBlogBySlug(slug, "bn")

    const posts: Record<string, { meta: BlogMeta; content: string } | null> = {
        en: enPost ? { meta: enPost.meta, content: enPost.content } : null,
        bn: bnPost ? { meta: bnPost.meta, content: bnPost.content } : null,
    }

    return (
        <div className="flex flex-col gap-8 bg-background/80 p-2 rounded border ">
            <Link
                href="/blogs"
                className="group flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                Back to blogs
            </Link>

            <Separator className="bg-border/30" />

            <BlogLanguageToggle
                slug={slug}
                availableLanguages={availableLanguages}
                defaultLang={defaultLang}
                posts={posts}
            />
        </div>
    )
}
