import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'
import { getHomeContent } from '@/lib/home'
import { getAllBlogs, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Ajitesh Panda',
  alternates: { canonical: '/' }
}

export default function Home() {
  const content = getHomeContent()
  const posts = getAllBlogs().slice(0, 3)

  return (
    <MainLayout>
      <div className="bg-paper text-ink">
        {/* Hero */}
        <section className="section-container pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-4xl">
            <p className="font-mono text-sm text-ink-soft mb-4">
              {content.greeting}
            </p>
            <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-4">
              {content.name}
            </h1>
            <p className="font-mono text-sm text-ink-soft mb-8">
              {content.highlights}
            </p>
            <div className="font-body text-lg md:text-xl leading-relaxed space-y-5 max-w-2xl text-ink/90">
              {content.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="font-mono text-xs text-ink-soft mt-8">
              {content.interests}
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                asChild
                className="bg-ink text-paper hover:bg-ink/90 font-mono"
              >
                <Link href="/projects" prefetch={true} className="inline-flex items-center">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Building */}
        <section className="border-t border-hairline">
          <div className="section-container py-20">
            <h2 className="font-mono text-sm uppercase tracking-widest text-ink-soft mb-12">
              Building
            </h2>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {content.ventures.map(venture => (
                <a
                  key={venture.name}
                  href={venture.link}
                  className={
                    venture.primary
                      ? 'relative rounded-lg bg-paper-deep border border-hairline p-8 md:p-10 hover:border-bamboo/50 transition-colors'
                      : 'relative rounded-lg bg-paper-deep/60 border border-hairline p-6 md:p-8 hover:border-bamboo/50 transition-colors'
                  }
                >
                  <p className="font-mono text-xs text-ink-soft uppercase tracking-widest mb-3">
                    {venture.tag}
                  </p>
                  <h3
                    className={
                      venture.primary
                        ? 'font-display font-bold text-3xl md:text-4xl mb-4'
                        : 'font-display font-medium text-2xl mb-3'
                    }
                  >
                    {venture.name}
                  </h3>
                  <p className="font-body text-ink/80 leading-relaxed">
                    {venture.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Writing */}
        <section className="border-t border-hairline">
          <div className="section-container py-20">
            <h2 className="font-mono text-sm uppercase tracking-widest text-ink-soft mb-12">
              Writing
            </h2>
            <div className="max-w-3xl space-y-0">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  prefetch={true}
                  className={
                    'flex items-baseline gap-6 py-6 group' +
                    (index !== posts.length - 1 ? ' border-b border-hairline' : '')
                  }
                >
                  <span className="font-mono text-xs text-ink-soft w-24 flex-shrink-0">
                    {formatDate(post.date)}
                  </span>
                  <span className="font-body text-xl group-hover:text-bamboo transition-colors flex-1">
                    {post.title}
                  </span>
                </Link>
              ))}
              {posts.length === 0 && (
                <p className="font-body text-ink-soft">Nothing published yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Sign-off */}
        <section className="border-t border-hairline">
          <div className="section-container py-24">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                {content.cta.title}
              </h2>
              <p className="font-body text-lg text-ink/80 mb-8">
                {content.cta.description}
              </p>
              <Button
                size="lg"
                asChild
                className="bg-bamboo text-paper hover:bg-bamboo/90 font-mono"
              >
                <a href={content.cta.buttonLink}>{content.cta.buttonText}</a>
              </Button>
              <div className="flex items-center gap-5 mt-12 text-ink-soft">
                <a
                  href={content.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={content.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href={content.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
