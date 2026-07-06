import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { JsonLd } from '@/components/JsonLd'
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
    description: post.subtitle,
    alternates: { canonical: `/blogs/${slug}` }
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

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.subtitle,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ajitesh Panda' },
    url: `https://ajitesh13.github.io/blogs/${post.slug}`
  }

  return (
    <MainLayout>
      <JsonLd data={blogSchema} />
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-3xl mx-auto space-y-12">
          <Link
            href="/blogs"
            className="font-mono text-sm text-ink-soft hover:text-ink transition-colors inline-block"
          >
            ← Back to Blog
          </Link>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="flex items-baseline gap-4 font-mono text-sm text-ink-soft">
                <time>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
                {post.title}
              </h1>
              <p className="font-body text-xl text-ink-soft">{post.subtitle}</p>
            </header>

            <div className="font-body max-w-none space-y-6 text-ink/90 text-lg leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-display font-bold text-ink text-2xl mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display font-bold text-ink text-xl mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-ink/90 leading-relaxed my-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 list-disc list-inside text-ink/90 my-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-2 list-decimal list-inside text-ink/90 my-4">
                      {children}
                    </ol>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-bamboo hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="font-mono bg-paper-deep border border-hairline px-1.5 py-0.5 text-sm text-ink">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="font-mono bg-paper-deep border border-hairline p-4 overflow-x-auto text-sm text-ink my-6">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-seal pl-4 italic text-ink-soft my-6">
                      {children}
                    </blockquote>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {post.tags.length > 0 && (
              <footer className="border-t border-hairline pt-8">
                <div className="flex items-center gap-2 text-sm font-mono text-ink-soft">
                  <span>Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span key={tag}>
                      <span className="text-ink">{tag}</span>
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
