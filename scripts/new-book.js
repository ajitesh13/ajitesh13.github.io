#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve)
  })
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

async function createBook() {
  console.log('\n📚 Add a new book\n')

  const title = await question('Book Title: ')
  const author = await question('Author: ')
  const year = await question('Year Read (e.g., 2024): ')
  const rating = await question('Rating (1-5): ')
  const coverImage = await question(
    'Cover Image Path (e.g., /images/books/book-name.jpg): '
  )
  const takeawaysInput = await question('Key Takeaways (comma-separated): ')

  const keyTakeaways = takeawaysInput
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const slug = slugify(title)

  const frontmatter = `---
title: '${title}'
author: '${author}'
year: '${year}'
rating: ${rating}
coverImage: '${coverImage}'
keyTakeaways:
${keyTakeaways.map(t => `  - ${t}`).join('\n')}
---

Write your book review/notes here using Markdown.

What did you learn from this book? How did it impact you?

## Key Insights

- Your thoughts...

## Favorite Quotes

> "Quote from the book..."

## Who Should Read This?

Your recommendation...
`

  const booksDir = path.join(process.cwd(), 'content', 'books')

  if (!fs.existsSync(booksDir)) {
    fs.mkdirSync(booksDir, { recursive: true })
  }

  const filePath = path.join(booksDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Error: Book with slug "${slug}" already exists!\n`)
    rl.close()
    process.exit(1)
  }

  fs.writeFileSync(filePath, frontmatter)

  console.log(`\n✅ Book added successfully!\n`)
  console.log(`📁 File: content/books/${slug}.md`)
  console.log(`🔗 URL: /books/${slug}`)
  console.log(`\n📝 Edit the file to add your review.\n`)

  rl.close()
}

createBook().catch(error => {
  console.error('\n❌ Error:', error.message)
  rl.close()
  process.exit(1)
})
