import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Link from 'next/link'
import { getAllBooks } from '@/lib/books'

export const metadata: Metadata = {
  title: 'Books',
  alternates: { canonical: '/books' }
}

export default function Books() {
  const books = getAllBooks()

  return (
    <MainLayout>
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl">Books</h1>
            <p className="font-body text-lg text-ink-soft">
              My reading list and recommendations
            </p>
          </div>

          {books.length > 0 ? (
            <div className="space-y-3">
              {books.map(book => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="block group"
                >
                  <article className="space-y-1 border-b border-hairline pb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-ink-soft flex-shrink-0">
                        {book.year}
                      </span>
                      <h2 className="font-display text-lg font-semibold group-hover:text-bamboo transition-colors">
                        {book.title}
                      </h2>
                    </div>
                    <p className="font-body text-xs text-ink-soft">by {book.author}</p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="font-body text-ink/80">
              <p>
                Coming soon... A curated list of books that have influenced my
                journey. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  )
}
