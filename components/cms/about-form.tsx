"use client"

import { useState } from "react"
import { upsertAboutMe } from "@/lib/actions/about"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type AboutFormProps = {
    initialContent: string
}

export function AboutForm({ initialContent }: AboutFormProps) {
    const [content, setContent] = useState(initialContent)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        const result = await upsertAboutMe(content)

        if (result.success) {
            setMessage("Saved successfully!")
        } else {
            setMessage(result.error ?? "Something went wrong")
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="content">
                    About Me Content (Markdown)
                </Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write about yourself in Markdown..."
                    className="min-h-[500px] font-mono text-sm"
                />
            </div>

            {message && (
                <p
                    className={`text-sm ${message.includes("success") ? "text-green-500" : "text-destructive"}`}
                >
                    {message}
                </p>
            )}

            <Button type="submit" disabled={loading} className="w-fit">
                {loading ? "Saving..." : "Save"}
            </Button>
        </form>
    )
}
