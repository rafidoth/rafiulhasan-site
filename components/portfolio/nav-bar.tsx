"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bigshot_One } from "next/font/google"
import { Separator } from "@/components/ui/separator"

const bigshot = Bigshot_One({
    subsets: ["latin"],
    weight: ["400"],
})

const navItems = [
    { href: "/", label: "Summary" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
]

export function NavBar() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    return (
        <nav className="w-full flex justify-center px-2 md:px-0">
            <div className="flex gap-1 md:gap-4 justify-center border border-border p-1.5 md:p-2 z-100 bg-[#18110e] rounded-md w-full md:w-auto max-w-md">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "relative flex items-center justify-center gap-3 rounded-md px-2 md:px-3 py-1.5 md:py-2 text-sm  font-medium transition-all duration-200 flex-1 md:flex-none",
                            isActive(item.href)
                                ? "bg-accent/80 text-accent-foreground"
                                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                        )}
                    >
                        {isActive(item.href) && (
                            <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary hidden md:block" />
                        )}
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
