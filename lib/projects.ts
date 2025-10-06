import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface Project {
  slug: string
  title: string
  description: string
  year: string
  platform: string
  stack: string
  github: string
  thumbnail: string
  images: string[]
  content: string
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)

  const allProjects = fileNames
    .filter(
      fileName => fileName.endsWith('.md') && !fileName.startsWith('README')
    )
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        year: data.year || '',
        platform: data.platform || '',
        stack: data.stack || '',
        github: data.github || '',
        thumbnail: data.thumbnail || '',
        images: data.images || [],
        content
      }
    })
    .filter(project => project.title && project.year)

  // Sort by year (most recent first)
  return allProjects.sort((a, b) => b.year.localeCompare(a.year))
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      year: data.year,
      platform: data.platform,
      stack: data.stack,
      github: data.github,
      thumbnail: data.thumbnail,
      images: data.images || [],
      content
    }
  } catch {
    return null
  }
}
