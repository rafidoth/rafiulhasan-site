"use client"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { cn } from "@/lib/utils"
import { useEffect, useState, type JSX } from "react"
import { createHighlighter, type Highlighter } from "shiki"
import { Tiro_Bangla } from "next/font/google"

type MarkdownRendererProps = {
    content: string
    className?: string
}

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ["github-dark-default"],
            langs: [
                "typescript",
                "javascript",
                "tsx",
                "jsx",
                "bash",
                "json",
                "css",
                "html",
                "python",
                "go",
                "rust",
                "java",
                "c",
                "cpp",
                "sql",
                "yaml",
                "markdown",
                "plaintext",
            ],
        })
    }
    return highlighterPromise
}

function CodeBlock({
    className = "font-mono",
    children,
    ...props
}: JSX.IntrinsicElements["code"]) {
    const [html, setHtml] = useState<string | null>(null)
    const match = /language-(\w+)/.exec(className || "")
    const lang = match ? match[1] : ""
    const code = String(children).replace(/\n$/, "")

    useEffect(() => {
        if (!lang) return
        let cancelled = false

        getHighlighter().then((highlighter) => {
            if (cancelled) return
            const loadedLangs = highlighter.getLoadedLanguages()
            const langToUse = loadedLangs.includes(lang) ? lang : "plaintext"

            const result = highlighter.codeToHtml(code, {
                lang: langToUse,
                theme: "github-dark-default",
            })
            setHtml(result)
        })

        return () => {
            cancelled = true
        }
    }, [code, lang])

    // Inline code (no language)
    if (!lang) {
        return (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }

    // While loading, render plain code block
    if (!html) {
        return (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }

    return (
        <span
            dangerouslySetInnerHTML={{ __html: html }}
            className="[&>pre]:!my-0 [&>pre]:!rounded-lg [&>pre]:!border [&>pre]:!border-border/50 [&>pre]:!p-4 [&>pre]:!text-sm"
        />
    )
}


export function MarkdownRenderer({
    content,
    className,
}: MarkdownRendererProps) {
    return (
        <div
            className={cn(
                "prose-custom max-w-none text-foreground",
                className
            )}
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code: CodeBlock,
                    pre: ({ children }) => <>{children}</>,
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}
