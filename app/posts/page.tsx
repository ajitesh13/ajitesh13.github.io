import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPhotos } from '@/lib/photos'
import { formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Through My Lens'
}

export default function Posts() {
  const photos = getAllPhotos()

  return (
    <MainLayout>
      <section className="section-container py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl heading-mono text-white">
              Through My Lens
            </h1>
            <p className="text-lg text-white/60">
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
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10 group-hover:border-accent-link/30 transition-colors">
                      <Image
                        src={photo.images[0]}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 text-xs text-white/40">
                        <span className="font-mono">
                          {formatDate(photo.date)}
                        </span>
                        <span>•</span>
                        <span>{photo.location}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-accent-link transition-colors">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-white/80">
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
