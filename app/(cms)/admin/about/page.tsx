import { getAboutMe } from "@/lib/queries/about"
import { AboutForm } from "@/components/cms/about-form"

export default async function AdminAboutPage() {
    const aboutMe = await getAboutMe()

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-foreground">About Me</h2>
            <AboutForm initialContent={aboutMe?.content ?? ""} />
        </div>
    )
}
