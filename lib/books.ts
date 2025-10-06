import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const booksDirectory = path.join(process.cwd(), 'content/books')

export interface Book {
  slug: string
  title: string
  author: string
  year: string
  rating: number
  coverImage: string
  review: string
  keyTakeaways: string[]
}

export function getAllBooks(): Book[] {
  if (!fs.existsSync(booksDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(booksDirectory)

  const allBooks = fileNames
    .filter(
      fileName => fileName.endsWith('.md') && !fileName.startsWith('README')
    )
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(booksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        author: data.author || '',
        year: data.year || '',
        rating: data.rating || 0,
        coverImage: data.coverImage || '',
        review: content,
        keyTakeaways: data.keyTakeaways || []
      }
    })
    .filter(book => book.title && book.author)

  // Sort by year (most recent first)
  return allBooks.sort((a, b) => b.year.localeCompare(a.year))
}

export function getBookBySlug(slug: string): Book | null {
  try {
    const fullPath = path.join(booksDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      author: data.author,
      year: data.year,
      rating: data.rating,
      coverImage: data.coverImage,
      review: content,
      keyTakeaways: data.keyTakeaways || []
    }
  } catch {
    return null
  }
}
