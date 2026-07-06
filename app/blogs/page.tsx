import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Link from 'next/link'
import { getAllBlogs, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  alternates: { canonical: '/blogs' }
}

export default function Blogs() {
  const blogPosts = getAllBlogs()

  return (
    <MainLayout>
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl">Blog</h1>
            <p className="font-body text-lg text-ink-soft">
              Thoughts, stories, and ideas
            </p>
          </div>

          {blogPosts.length > 0 ? (
            <div className="space-y-3">
              {blogPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="block group"
                >
                  <article className="space-y-1 border-b border-hairline pb-3">
                    <div className="flex items-baseline gap-3">
                      <time className="text-xs font-mono text-ink-soft flex-shrink-0">
                        {formatDate(post.date)}
                      </time>
                      <h2 className="font-display text-lg font-semibold group-hover:text-bamboo transition-colors">
                        {post.title}
                      </h2>
                    </div>
                    <p className="font-body text-xs text-ink-soft">{post.subtitle}</p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="font-body text-ink/80">
              <p>
                Coming soon... Trying to pen down my experiences. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  )
}
