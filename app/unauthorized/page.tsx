import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
            <p className="mt-2 text-center text-muted-foreground">
                You are not authorized to access this area.
            </p>
            <div className="mt-6 flex gap-4">
                <Link
                    href="/"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    Go Home
                </Link>
                <SignOutButton>
                    <button className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                        Sign Out
                    </button>
                </SignOutButton>
            </div>
        </div>
    )
}
