import type { Technology } from "@/lib/generated/prisma/client"
import { TECHNOLOGY_MAP } from "@/lib/constants/technologies"
import { cn } from "@/lib/utils"

type TechBadgeProps = {
    tech: Technology
    className?: string
}

export function TechBadge({ tech, className }: TechBadgeProps) {
    const info = TECHNOLOGY_MAP[tech]
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80",
                className
            )}
        >
            <span
                className="size-2 rounded-full"
                style={{ backgroundColor: info.color }}
            />
            {info.label}
        </span>
    )
}
