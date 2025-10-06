import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllBlogs, getBlogBySlug, formatDate } from '@/lib/blog'

export async function generateStaticParams() {
  const blogs = getAllBlogs()
  return blogs.map(blog => ({
    slug: blog.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.subtitle
  }
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <MainLayout>
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            href="/blogs"
            className="text-white/60 hover:text-white transition-colors inline-block"
          >
            ← Back to Blog
          </Link>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="flex items-baseline gap-4">
                <time className="text-sm font-mono text-white/40">
                  {formatDate(post.date)}
                </time>
                <span className="text-sm text-white/40">•</span>
                <span className="text-sm text-white/40">{post.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {post.title}
              </h1>
              <p className="text-xl text-white/60">{post.subtitle}</p>
            </header>

            <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-white mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-white/80 leading-relaxed my-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 list-disc list-inside text-white/80 my-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-2 list-decimal list-inside text-white/80 my-4">
                      {children}
                    </ol>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="bg-white/10 px-1 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {post.tags.length > 0 && (
              <footer className="border-t border-white/10 pt-8">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <span>Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span key={tag}>
                      <span className="text-white/60">{tag}</span>
                      {index < post.tags.length - 1 && (
                        <span className="mx-1">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </article>
        </div>
      </section>
    </MainLayout>
  )
}
