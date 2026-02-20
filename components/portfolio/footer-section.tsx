import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function FooterSection() {
    return (
        <footer className="flex items-center justify-between py-6 border-t border-border/30">
            <div className="flex items-center gap-6">
                <Link
                    href="https://github.com/rafidoth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    GitHub
                </Link>
                <Link
                    href="https://linkedin.com/in/rafiulhasan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    LinkedIn
                </Link>
                <Link
                    href="mailto:srafiulhasan@gmail.com"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    Mail
                </Link>
            </div>
        </footer>
    )
}
