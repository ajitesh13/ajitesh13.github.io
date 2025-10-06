import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const photosDirectory = path.join(process.cwd(), 'content/photos')

export interface Photo {
  slug: string
  title: string
  location: string
  date: string
  description: string
  images: string[]
  camera?: string
  lens?: string
}

export function getAllPhotos(): Photo[] {
  if (!fs.existsSync(photosDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(photosDirectory)

  const allPhotos = fileNames
    .filter(
      fileName => fileName.endsWith('.md') && !fileName.startsWith('README')
    )
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(photosDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        location: data.location || '',
        date: data.date || '',
        description: content,
        images: data.images || [],
        camera: data.camera,
        lens: data.lens
      }
    })
    .filter(photo => photo.title && photo.images.length > 0)

  // Sort by date (most recent first)
  return allPhotos.sort((a, b) => b.date.localeCompare(a.date))
}

export function getPhotoBySlug(slug: string): Photo | null {
  try {
    const fullPath = path.join(photosDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      location: data.location,
      date: data.date,
      description: content,
      images: data.images || [],
      camera: data.camera,
      lens: data.lens
    }
  } catch {
    return null
  }
}
