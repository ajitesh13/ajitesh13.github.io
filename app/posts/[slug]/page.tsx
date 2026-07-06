import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllPhotos, getPhotoBySlug } from '@/lib/photos'
import { formatDate } from '@/lib/blog'

export async function generateStaticParams() {
  const photos = getAllPhotos()
  return photos.map(photo => ({
    slug: photo.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const photo = getPhotoBySlug(slug)

  if (!photo) {
    return { title: 'Photo Not Found' }
  }

  return {
    title: photo.title,
    alternates: { canonical: `/posts/${slug}` }
  }
}

export default async function PhotoPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const photo = getPhotoBySlug(slug)

  if (!photo) {
    notFound()
  }

  return (
    <MainLayout>
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          <Link
            href="/posts"
            className="font-mono text-sm text-ink-soft hover:text-ink transition-colors inline-block"
          >
            ← Back to Photos
          </Link>

          <div className="space-y-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl">
              {photo.title}
            </h1>
            <div className="flex items-baseline gap-3 text-sm font-mono text-ink-soft">
              <span>{formatDate(photo.date)}</span>
              <span>•</span>
              <span>{photo.location}</span>
              {photo.camera && (
                <>
                  <span>•</span>
                  <span>{photo.camera}</span>
                </>
              )}
              {photo.lens && (
                <>
                  <span>•</span>
                  <span>{photo.lens}</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="font-body max-w-none text-ink/90 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {photo.description}
            </ReactMarkdown>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photo.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-96 overflow-hidden border border-hairline"
              >
                <Image
                  src={image}
                  alt={`${photo.title} - Photo ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
