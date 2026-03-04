"use client"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { cn } from "@/lib/utils"
import { useEffect, useState, type JSX } from "react"
import { createHighlighter, type Highlighter } from "shiki"
import { JetBrains_Mono } from "next/font/google"


type MarkdownRendererProps = {
    content: string
    className?: string
}

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ["vitesse-black", "gruvbox-dark-hard", "github-dark-default"],
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

const jetBrainsMono = JetBrains_Mono({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-mono-jetbrains",
})

function CodeBlock({
    className,
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
                theme: "gruvbox-dark-hard",
            })

            const cleanHtml = result.replace(/font-family:[^;]+;/g, "")

            setHtml(cleanHtml)
        })

        return () => {
            cancelled = true
        }
    }, [code, lang])

    // Inline code (no language)
    if (!lang) {
        return (
            <code
                className={cn("font-mono", jetBrainsMono.className, className)}
                {...props}
            >
                {children}
            </code>
        )
    }

    // Loading state
    if (!html) {
        return (
            <code
                className={cn("font-mono block", jetBrainsMono.className, className)}
                {...props}
            >
                {children}
            </code>
        )
    }

    // 3. Rendered Shiki HTML
    // - style sets the actual font-family so <pre> and <code> inside can inherit it
    // - jetBrainsMono.className registers the --font-mono-jetbrains CSS variable
    // - [&>pre]:![font-family:inherit] is the correct Tailwind arbitrary syntax
    //   (font-inherit is NOT a valid Tailwind utility and does nothing)
    return (
        <span
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ fontFamily: "var(--font-mono-jetbrains), monospace" }}
            className={cn(
                jetBrainsMono.className,
                "[&>pre]:![font-family:inherit]",
                "[&>pre_code]:![font-family:inherit]",
                "[&>pre]:!my-0",
                "[&>pre]:!rounded-lg",
                "[&>pre]:sm:!rounded-xl",
                "[&>pre]:!border-none",
                "[&>pre]:!p-3",
                "[&>pre]:sm:!p-5",
                "[&>pre]:md:!p-10",
                "[&>pre]:!text-xs",
                "[&>pre]:sm:!text-sm",
            )}
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
                "prose-custom max-w-none overflow-hidden",
                className
            )}
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code: ({ className, children, ...props }) => (
                        <CodeBlock className={className} {...props}>
                            {children}
                        </CodeBlock>
                    ),
                    pre: ({ children }) => <>{children}</>,
                    table: ({ children }) => (
                        <div className="overflow-x-auto -mx-1 px-1">
                            <table>{children}</table>
                        </div>
                    ),
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}
