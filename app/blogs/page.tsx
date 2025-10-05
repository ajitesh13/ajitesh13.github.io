import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Link from 'next/link'
import { getAllBlogs, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog'
}

export default function Blogs() {
  const blogPosts = getAllBlogs()

  return (
    <MainLayout>
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Blog</h1>
            <p className="text-lg text-white/60">
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
                  <article className="space-y-1 border-b border-white/10 pb-3">
                    <div className="flex items-baseline gap-3">
                      <time className="text-xs font-mono text-white/40 flex-shrink-0">
                        {formatDate(post.date)}
                      </time>
                      <h2 className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors">
                        {post.title}
                      </h2>
                    </div>
                    <p className="text-xs text-white/60">{post.subtitle}</p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-white/80">
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
