"use client"

import { useState, useEffect } from "react"
import type { Language, BlogMeta } from "@/lib/blog-types"
import { LANGUAGE_LABELS } from "@/lib/blog-types"
import { MarkdownRenderer } from "@/components/portfolio/markdown-renderer"
import { Calendar, User } from "lucide-react"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const LANG_PREFERENCE_KEY = "blog_lang_preference"

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

    // On mount, check localStorage for a saved language preference
    useEffect(() => {
        const stored = localStorage.getItem(LANG_PREFERENCE_KEY)
        if (
            stored &&
            (stored === "en" || stored === "bn") &&
            availableLanguages.includes(stored)
        ) {
            setActiveLang(stored)
        }
    }, [availableLanguages])

    const handleLanguageChange = (lang: Language) => {
        setActiveLang(lang)
        localStorage.setItem(LANG_PREFERENCE_KEY, lang)
    }

    const activePost = posts[activeLang]
    const hasContent = activePost !== null && activePost !== undefined

    // Find a language that does have content (for the fallback message)
    const fallbackLang = availableLanguages.find((l) => l !== activeLang)

    const isBangla = activeLang === "bn"

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex justify-between">
                <Link
                    href="/blogs"
                    className="group flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                    Back to blogs
                </Link>

                <div className="flex items-center gap-2">
                    {(["en", "bn"] as Language[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-all ${activeLang === lang
                                ? "bg-secondary text-primary-foreground "
                                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                }`}
                        >
                            {LANGUAGE_LABELS[lang]}
                        </button>
                    ))}
                </div>
            </div>

            <h1 className="w-full flex justify-center text-3xl font-bold text-primary">
                {activePost?.meta.title}
            </h1>

            {/* Language toggle */}

            {hasContent ? (
                <div
                    className={`flex flex-col gap-6 ${isBangla ? "font-bangla" : ""}`}
                    lang={isBangla ? "bn" : "en"}
                >

                    {/* Blog content */}
                    <MarkdownRenderer content={activePost.content} className="font-bangla" />
                </div>
            ) : (
                <div className="rounded-lg border border-border/50 bg-card/50 p-8 text-center">
                    <p className="text-muted-foreground">
                        Sorry, this article is only available in{" "}
                        {fallbackLang ? (
                            <button
                                onClick={() => handleLanguageChange(fallbackLang)}
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
