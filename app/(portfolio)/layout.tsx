import { NavBar } from "@/components/portfolio/nav-bar"
import { BGPattern } from "@/components/ui/bg-pattern"
import { WizardGuide } from "@/components/portfolio/wizard-guide"

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full flex justify-center bg-background relative">
            <WizardGuide />
            <BGPattern className="pointer-events-none" variant="vertical-lines" mask="fade-bottom" fill="rgba(255,255,255,0.08)" size={16} />
            <main className="relative z-20 w-full flex flex-col items-center md:max-w-5xl px-2 py-8 md:px-4 md:py-16 gap-6 md:gap-8">
                <NavBar />
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
