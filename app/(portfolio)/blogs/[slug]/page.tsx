import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import {
    getAllBlogSlugs,
    getBlogBySlug,
    getAvailableLanguages,
    type Language,
    type BlogMeta,
} from "@/lib/blog"
import { BlogLanguageToggle } from "@/components/portfolio/blog-language-toggle"

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

    // Detect if visitor is from Bangladesh via geo cookie set in middleware
    const cookieStore = await cookies()
    const country = cookieStore.get("geo_country")?.value
    const isBangladesh = country === "BD"

    // Default to Bangla for Bangladeshi visitors (if available), otherwise English
    const defaultLang: Language =
        isBangladesh && availableLanguages.includes("bn")
            ? "bn"
            : availableLanguages.includes("en")
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
        <div className="flex flex-col gap-8  items-center">
            <div className="md:w-[800px]">
                <BlogLanguageToggle
                    slug={slug}
                    availableLanguages={availableLanguages}
                    defaultLang={defaultLang}
                    posts={posts}
                />
            </div>
        </div>
    )
}
