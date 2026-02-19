import { NavBar } from "@/components/portfolio/nav-bar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BGPattern } from "@/components/ui/bg-pattern"
import Image from "next/image"

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative overflow-hidden bg-background">
            <Image src="/wiz.png" alt="wizard" width={100} height={100} className="absolute right-5 bottom-5 rounded-full border-2  border-border" />
            <BGPattern variant="vertical-lines" mask="fade-bottom" fill="rgba(255,255,255,0.08)" size={16} />
            <ScrollArea className="flex-1">
                <main className="mx-auto max-w-5xl px-2 py-12 md:px-4 md:py-16">
                    <NavBar />
                    {children}
                </main>
            </ScrollArea>
        </div>
    )
}
