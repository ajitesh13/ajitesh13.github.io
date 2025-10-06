import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  date: string
  tags: string[]
  content: string
  readTime: string
}

export function getAllBlogs(): BlogPost[] {
  // Get file names under content/blogs
  const fileNames = fs.readdirSync(blogsDirectory)

  const allBlogs = fileNames
    .filter(
      fileName => fileName.endsWith('.md') && !fileName.startsWith('README')
    )
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents)

      // Calculate reading time
      const stats = readingTime(content)

      // Combine the data with the slug
      return {
        slug,
        title: data.title || 'Untitled',
        subtitle: data.subtitle || '',
        date: data.date || new Date().toISOString().split('T')[0],
        tags: data.tags || [],
        content,
        readTime: stats.text
      }
    })
    .filter(blog => blog.title && blog.date)

  // Sort posts by date
  return allBlogs.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date,
      tags: data.tags || [],
      content,
      readTime: stats.text
    }
  } catch {
    return null
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
