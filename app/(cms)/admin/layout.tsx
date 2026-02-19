import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { SignOutButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const ADMIN_EMAIL = "rafiulhasan803@gmail.com"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await currentUser()

    // Email whitelist check - only allow your email
    const userEmail = user?.emailAddresses?.[0]?.emailAddress
    if (userEmail !== ADMIN_EMAIL) {
        redirect("/unauthorized")
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card/50">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <h1 className="text-sm font-semibold text-foreground">
                        Portfolio CMS
                    </h1>
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/admin/projects"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/admin/about"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                        <Link
                            href="/admin/blogs"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/"
                            className="text-sm text-primary transition-colors hover:text-primary/80"
                        >
                            ← View Site
                        </Link>
                        <SignOutButton>
                            <button className="text-sm text-red-400 transition-colors hover:text-red-300">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        </div>
    )
}
