import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { StatsSection } from "@/components/landing/stats-section"
import { AdditionalFeaturesSection } from "@/components/landing/additional-features-section"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <AdditionalFeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
