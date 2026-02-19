import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { cn } from "@/lib/utils"

type MarkdownRendererProps = {
    content: string
    className?: string
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
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
            </Markdown>
        </div>
    )
}
