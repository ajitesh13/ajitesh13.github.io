import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Link from 'next/link'
import { getAllBooks } from '@/lib/books'

export const metadata: Metadata = {
  title: 'Books'
}

export default function Books() {
  const books = getAllBooks()

  return (
    <MainLayout>
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Books</h1>
            <p className="text-lg text-white/60">
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
                  <article className="space-y-1 border-b border-white/10 pb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-white/40 flex-shrink-0">
                        {book.year}
                      </span>
                      <h2 className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors">
                        {book.title}
                      </h2>
                    </div>
                    <p className="text-xs text-white/60">by {book.author}</p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-white/80">
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
