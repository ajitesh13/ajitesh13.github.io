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

async function createPhoto(): Promise<void> {
  console.log('\n📸 Add a new photo collection\n')

  const title = await question('Title: ')
  const location = await question('Location: ')
  const date = await question('Date (YYYY-MM-DD): ')
  const camera = await question('Camera (optional): ')
  const lens = await question('Lens (optional): ')
  const imagesInput = await question('Image Paths (comma-separated): ')

  const images = imagesInput
    .split(',')
    .map(img => img.trim())
    .filter(img => img.length > 0)

  const slug = slugify(title)

  const cameraInfo = camera ? `\ncamera: '${camera}'` : ''
  const lensInfo = lens ? `\nlens: '${lens}'` : ''

  const frontmatter = `---
title: '${title}'
location: '${location}'
date: '${date}'${cameraInfo}${lensInfo}
images:
${images.map(img => `  - '${img}'`).join('\n')}
---

Write about the story behind these photos...

What made this moment special? What were you trying to capture?
`

  const photosDir = path.join(process.cwd(), 'content', 'photos')

  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true })
  }

  const filePath = path.join(photosDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    console.error(
      `\n❌ Error: Photo collection with slug "${slug}" already exists!\n`
    )
    rl.close()
    process.exit(1)
  }

  fs.writeFileSync(filePath, frontmatter)

  console.log(`\n✅ Photo collection created successfully!\n`)
  console.log(`📁 File: content/photos/${slug}.md`)
  console.log(`🔗 URL: /posts/${slug}`)
  console.log(`\n📝 Edit the file to add your story.\n`)

  rl.close()
}

createPhoto().catch(error => {
  console.error('\n❌ Error:', error.message)
  rl.close()
  process.exit(1)
})
