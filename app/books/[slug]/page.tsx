import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllBooks, getBookBySlug } from '@/lib/books'

export async function generateStaticParams() {
  const books = getAllBooks()
  return books.map(book => ({
    slug: book.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book) {
    return { title: 'Book Not Found' }
  }

  return {
    title: `${book.title} by ${book.author}`
  }
}

export default async function BookPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book) {
    notFound()
  }

  return (
    <MainLayout>
      <section className="section-container py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            href="/books"
            className="text-accent-link hover:text-accent-link/80 transition-colors inline-block"
          >
            ← Back to Books
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Book Cover */}
            {book.coverImage && (
              <div className="md:col-span-1">
                <div className="relative w-full h-96 rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Book Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl heading-mono text-white mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-white/60">by {book.author}</p>
              </div>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-white/40">Year:</span>{' '}
                  <span className="text-white/80">{book.year}</span>
                </div>
                <div>
                  <span className="text-white/40">Rating:</span>{' '}
                  <span className="text-white/80">
                    {'⭐'.repeat(book.rating)}
                  </span>
                </div>
              </div>

              {book.keyTakeaways.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg heading-mono text-white">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2 text-sm text-white/80">
                    {book.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-accent-link">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Review */}
          <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed section-divider pt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl heading-mono text-white mt-8 mb-4">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="text-white/80 leading-relaxed my-4">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent-link pl-4 italic text-white/70 my-4">
                    {children}
                  </blockquote>
                )
              }}
            >
              {book.review}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
