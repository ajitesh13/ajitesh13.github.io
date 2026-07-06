import type { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blog'
import { getAllProjects } from '@/lib/projects'
import { getAllBooks } from '@/lib/books'
import { getAllPhotos } from '@/lib/photos'

export const dynamic = 'force-static'

const BASE_URL = 'https://ajitesh13.github.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/projects`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blogs`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/books`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/posts`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/resume`, changeFrequency: 'yearly', priority: 0.7 }
  ]

  const blogEntries: MetadataRoute.Sitemap = getAllBlogs().map(post => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map(
    project => ({
      url: `${BASE_URL}/works/${project.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7
    })
  )

  const bookEntries: MetadataRoute.Sitemap = getAllBooks().map(book => ({
    url: `${BASE_URL}/books/${book.slug}`,
    changeFrequency: 'yearly',
    priority: 0.5
  }))

  const photoEntries: MetadataRoute.Sitemap = getAllPhotos().map(photo => ({
    url: `${BASE_URL}/posts/${photo.slug}`,
    lastModified: photo.date || undefined,
    changeFrequency: 'yearly',
    priority: 0.5
  }))

  return [
    ...staticRoutes,
    ...blogEntries,
    ...projectEntries,
    ...bookEntries,
    ...photoEntries
  ]
}
