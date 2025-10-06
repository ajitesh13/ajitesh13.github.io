#!/usr/bin/env tsx

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, resolve)
  })
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

async function createBlog(): Promise<void> {
  console.log('\n📝 Create a new blog post\n')

  const title = await question('Title: ')
  const subtitle = await question('Subtitle: ')
  const tagsInput = await question('Tags (comma-separated): ')

  const tags = tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]

  const frontmatter = `---
title: "${title}"
subtitle: "${subtitle}"
date: "${date}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---

Write your blog content here using Markdown.

## Heading 2

Your content...

### Heading 3

More content...

## Lists

- Item 1
- Item 2
- Item 3

## Links

[Link text](https://example.com)

## Code

Use \`inline code\` or code blocks:

\`\`\`javascript
const example = 'code'
\`\`\`
`

  const blogsDir = path.join(process.cwd(), 'content', 'blogs')

  // Create blogs directory if it doesn't exist
  if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir, { recursive: true })
  }

  const filePath = path.join(blogsDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Error: Blog with slug "${slug}" already exists!\n`)
    rl.close()
    process.exit(1)
  }

  fs.writeFileSync(filePath, frontmatter)

  console.log(`\n✅ Blog created successfully!\n`)
  console.log(`📁 File: content/blogs/${slug}.md`)
  console.log(`🔗 URL: /blogs/${slug}`)
  console.log(`\n📝 Edit the file to add your content.\n`)

  rl.close()
}

createBlog().catch(error => {
  console.error('\n❌ Error:', error.message)
  rl.close()
  process.exit(1)
})
