#!/usr/bin/env tsx

import * as fs from 'fs'
import * as path from 'path'
import { getHomeContent } from '../lib/home'
import { getAllBlogs } from '../lib/blog'
import { getAllProjects } from '../lib/projects'
import { getAllBooks } from '../lib/books'
import { getAllPhotos } from '../lib/photos'

const BASE_URL = 'https://ajitesh13.github.io'

function buildLlmsTxt(): string {
  const home = getHomeContent()
  const blogs = getAllBlogs()
  const projects = getAllProjects()
  const books = getAllBooks()
  const photos = getAllPhotos()

  const lines: string[] = []

  lines.push(`# ${home.name}`)
  lines.push('')
  lines.push(`> ${home.tagline}. ${home.bio[0] ?? ''}`.trim())
  lines.push('')

  lines.push('## Pages')
  lines.push(`- [Home](${BASE_URL}/): Bio, career timeline, and current ventures`)
  lines.push(`- [Projects](${BASE_URL}/projects): Software projects and open source work`)
  lines.push(`- [Blog](${BASE_URL}/blogs): Writing on web development, LLMs, and engineering`)
  lines.push(`- [Books](${BASE_URL}/books): Book reviews and reading notes`)
  lines.push(`- [Through My Lens](${BASE_URL}/posts): Photography`)
  lines.push(`- [Resume](${BASE_URL}/resume): Experience and education`)
  lines.push('')

  if (blogs.length > 0) {
    lines.push('## Blog Posts')
    blogs.forEach(post => {
      lines.push(`- [${post.title}](${BASE_URL}/blogs/${post.slug}): ${post.subtitle}`)
    })
    lines.push('')
  }

  if (projects.length > 0) {
    lines.push('## Projects')
    projects.forEach(project => {
      lines.push(`- [${project.title}](${BASE_URL}/works/${project.slug}): ${project.description}`)
    })
    lines.push('')
  }

  if (books.length > 0) {
    lines.push('## Books')
    books.forEach(book => {
      lines.push(`- [${book.title} by ${book.author}](${BASE_URL}/books/${book.slug})`)
    })
    lines.push('')
  }

  if (photos.length > 0) {
    lines.push('## Photo Essays')
    photos.forEach(photo => {
      lines.push(`- [${photo.title}](${BASE_URL}/posts/${photo.slug}): ${photo.location}`)
    })
  }

  return lines.join('\n').trim() + '\n'
}

const outPath = path.join(process.cwd(), 'public', 'llms.txt')
fs.writeFileSync(outPath, buildLlmsTxt())
console.log(`✅ Generated ${outPath}`)
