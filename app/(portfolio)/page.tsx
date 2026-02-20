import { getFeaturedProjects } from "@/lib/queries/projects"
import { HeroSection } from "@/components/portfolio/hero-section"
import { FeaturedProjectsSection } from "@/components/portfolio/featured-projects-section"
import { FooterSection } from "@/components/portfolio/footer-section"
export const revalidate = 1800;
export default async function SummaryPage() {
    const featuredProjects = await getFeaturedProjects(4)
    return (
        <div className="flex flex-col gap-8">
            <HeroSection />
            <FeaturedProjectsSection projects={featuredProjects} />
            <FooterSection />
        </div>
    )
}
