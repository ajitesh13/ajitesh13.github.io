import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getHomeContent } from '@/lib/home'

export const metadata: Metadata = {
  title: 'Ajitesh Panda'
}

export default function Home() {
  const content = getHomeContent()

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section-container py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              {content.name}
            </h1>
            <p className="text-xl text-white/60">{content.tagline}</p>
          </div>

          <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
            {content.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div>
            <Button size="lg" asChild>
              <Link
                href="/projects"
                prefetch={true}
                className="inline-flex items-center"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-container py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-white">Timeline</h2>

          <div className="space-y-4">
            {content.timeline.map((item, index) => (
              <div key={index} className="flex gap-6 text-white/80">
                <div className="flex-shrink-0 w-28 text-sm font-mono text-white/60">
                  {item.date}
                </div>
                <div className="flex-1">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="section-container py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white">Interests</h2>
          <p className="text-lg text-white/80">{content.interests}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white">{content.cta.title}</h2>
          <p className="text-white/80">{content.cta.description}</p>
          <div>
            <Button size="lg" asChild>
              <a href={content.cta.buttonLink}>{content.cta.buttonText}</a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
