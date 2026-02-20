"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const WELCOME_MESSAGE = "Hey! Welcome to my portfolio. Feel free to look around!"
const VISITED_KEY = "portfolio_visited"
const AUTO_DISMISS_MS = 8000

export function WizardGuide() {
    const [showBubble, setShowBubble] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const hasVisited = localStorage.getItem(VISITED_KEY)
        if (!hasVisited) {
            setShowBubble(true)
            requestAnimationFrame(() => {
                setIsAnimating(true)
            })
        }
    }, [])

    useEffect(() => {
        if (!showBubble || !isAnimating) return

        const timer = setTimeout(() => {
            dismiss()
        }, AUTO_DISMISS_MS)

        return () => clearTimeout(timer)
    }, [showBubble, isAnimating])

    const dismiss = () => {
        setIsAnimating(false)
        setTimeout(() => {
            setShowBubble(false)
            setIsVisible(false)
            localStorage.setItem(VISITED_KEY, "true")
        }, 400)
    }

    if (!isVisible) return null

    return (
        <div
            className={cn(
                "fixed right-5 bottom-5 z-50 transition-all duration-400",
                isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
        >
            {showBubble && (
                <div
                    className={cn(
                        "absolute bottom-full right-0 mb-3 w-64 p-4 rounded-lg bg-card border border-border shadow-lg",
                        "transition-all duration-300",
                        isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}
                >
                    <button
                        onClick={dismiss}
                        className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <p className="text-sm text-card-foreground pr-5">{WELCOME_MESSAGE}</p>
                    <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-card" />
                    <div className="absolute -bottom-[9px] right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-border" />
                </div>
            )}
            <Image
                src="/wiz.png"
                alt="wizard"
                width={100}
                height={100}
                className="rounded-full border-2 border-border transition-transform"
            />
        </div>
    )
}
