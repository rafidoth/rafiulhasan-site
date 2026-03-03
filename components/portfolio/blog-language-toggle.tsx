"use client"

import { useState } from "react"
import type { Language, BlogMeta } from "@/lib/blog-types"
import { LANGUAGE_LABELS } from "@/lib/blog-types"
import { MarkdownRenderer } from "@/components/portfolio/markdown-renderer"
import { Calendar, User } from "lucide-react"
import { format } from "date-fns"

type BlogLanguageToggleProps = {
    slug: string
    availableLanguages: Language[]
    defaultLang: Language
    posts: Record<
        string,
        { meta: BlogMeta; content: string } | null
    >
}

export function BlogLanguageToggle({
    availableLanguages,
    defaultLang,
    posts,
}: BlogLanguageToggleProps) {
    const [activeLang, setActiveLang] = useState<Language>(defaultLang)

    const activePost = posts[activeLang]
    const hasContent = activePost !== null && activePost !== undefined

    // Find a language that does have content (for the fallback message)
    const fallbackLang = availableLanguages.find((l) => l !== activeLang)

    const isBangla = activeLang === "bn"

    return (
        <div className="flex flex-col gap-6">
            {/* Language toggle */}
            <div className="flex items-center gap-2">
                {(["en", "bn"] as Language[]).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all ${activeLang === lang
                            ? "bg-secondary text-primary-foreground "
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                            }`}
                    >
                        {LANGUAGE_LABELS[lang]}
                    </button>
                ))}
            </div>

            {hasContent ? (
                <div
                    className={`flex flex-col gap-6 ${isBangla ? "font-bangla" : ""}`}
                    lang={isBangla ? "bn" : "en"}
                >
                    {/* Blog meta header */}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-bold text-foreground">
                            {activePost.meta.title}
                        </h1>
                        {activePost.meta.excerpt && (
                            <p className="text-base text-muted-foreground">
                                {activePost.meta.excerpt}
                            </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="size-3.5" />
                                {format(
                                    new Date(activePost.meta.publishDate),
                                    "MMMM d, yyyy"
                                )}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="size-3.5" />
                                {activePost.meta.author}
                            </span>
                        </div>
                        {activePost.meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {activePost.meta.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Blog content */}
                    <MarkdownRenderer content={activePost.content} className="font-bangla" />
                </div>
            ) : (
                <div className="rounded-lg border border-border/50 bg-card/50 p-8 text-center">
                    <p className="text-muted-foreground">
                        Sorry, this article is only available in{" "}
                        {fallbackLang ? (
                            <button
                                onClick={() => setActiveLang(fallbackLang)}
                                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
                            >
                                {LANGUAGE_LABELS[fallbackLang]}
                            </button>
                        ) : (
                            "another language"
                        )}
                        .
                    </p>
                </div>
            )}
        </div>
    )
}
