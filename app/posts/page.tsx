import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPhotos } from '@/lib/photos'
import { formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Through My Lens',
  alternates: { canonical: '/posts' }
}

export default function Posts() {
  const photos = getAllPhotos()

  return (
    <MainLayout>
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl">
              Through My Lens
            </h1>
            <p className="font-body text-lg text-ink-soft">
              Capturing the world one frame at a time
            </p>
          </div>

          {photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map(photo => (
                <Link
                  key={photo.slug}
                  href={`/posts/${photo.slug}`}
                  className="block group"
                >
                  <div className="space-y-3">
                    {/* Cover Image */}
                    <div className="relative w-full h-64 overflow-hidden rounded-lg border border-hairline">
                      <Image
                        src={photo.images[0]}
                        alt={`${photo.title} — ${photo.location}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 text-xs text-ink-soft">
                        <span className="font-mono">
                          {formatDate(photo.date)}
                        </span>
                        <span>•</span>
                        <span>{photo.location}</span>
                      </div>
                      <h3 className="font-display text-base font-semibold group-hover:text-bamboo transition-colors">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="font-body text-ink/80">
              <p>
                Coming soon... Trying to put out the world through my lens. Stay
                tuned!
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  )
}
