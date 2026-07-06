import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { JsonLd } from '@/components/JsonLd'
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
    title: `${book.title} by ${book.author}`,
    alternates: { canonical: `/books/${slug}` }
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

  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Book',
      name: book.title,
      author: { '@type': 'Person', name: book.author }
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: book.rating,
      bestRating: 5
    },
    author: { '@type': 'Person', name: 'Ajitesh Panda' }
  }

  return (
    <MainLayout>
      <JsonLd data={bookSchema} />
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            href="/books"
            className="font-mono text-sm text-ink-soft hover:text-ink transition-colors inline-block"
          >
            ← Back to Books
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Book Cover */}
            {book.coverImage && (
              <div className="md:col-span-1">
                <div className="relative w-full h-96 overflow-hidden border border-hairline">
                  <Image
                    src={book.coverImage}
                    alt={`Cover of ${book.title} by ${book.author}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Book Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="font-display font-bold text-4xl mb-2">
                  {book.title}
                </h1>
                <p className="font-body text-xl text-ink-soft">by {book.author}</p>
              </div>

              <div className="flex gap-6 text-sm font-mono">
                <div>
                  <span className="text-ink-soft">Year:</span>{' '}
                  <span className="text-ink">{book.year}</span>
                </div>
                <div>
                  <span className="text-ink-soft">Rating:</span>{' '}
                  <span className="text-ink">
                    {'⭐'.repeat(book.rating)}
                  </span>
                </div>
              </div>

              {book.keyTakeaways.length > 0 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">
                    Key Takeaways
                  </h2>
                  <ul className="font-body space-y-2 text-sm text-ink/90">
                    {book.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-seal">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Review */}
          <div className="font-body max-w-none space-y-6 text-ink/90 leading-relaxed border-t border-hairline pt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="font-display font-bold text-ink text-2xl mt-8 mb-4">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="text-ink/90 leading-relaxed my-4">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-seal pl-4 italic text-ink-soft my-4">
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
