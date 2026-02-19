"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteProject } from "@/lib/actions/projects"
import { Button } from "@/components/ui/button"

export function DeleteProjectButton({ id }: { id: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this project?")) return
        setLoading(true)
        await deleteProject(id)
        router.refresh()
        setLoading(false)
    }

    return (
        <Button
            variant="destructive"
            size="xs"
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? "..." : "Delete"}
        </Button>
    )
}
