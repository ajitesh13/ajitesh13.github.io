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

async function createProject(): Promise<void> {
  console.log('\n🚀 Add a new project\n')

  const title = await question('Project Title: ')
  const description = await question('Short Description: ')
  const year = await question('Year: ')
  const platform = await question('Platform (e.g., Web, iOS, CLI): ')
  const stack = await question('Tech Stack (e.g., React, Node.js): ')
  const github = await question('GitHub URL: ')
  const thumbnail = await question(
    'Thumbnail Image Path (e.g., /images/works/project.png): '
  )
  const imagesInput = await question(
    'Additional Images (comma-separated paths): '
  )

  const images = [thumbnail]
  if (imagesInput.trim()) {
    images.push(...imagesInput.split(',').map(img => img.trim()))
  }

  const slug = slugify(title)

  const frontmatter = `---
title: '${title}'
description: '${description}'
year: '${year}'
platform: '${platform}'
stack: '${stack}'
github: '${github}'
thumbnail: '${thumbnail}'
images:
${images.map(img => `  - '${img}'`).join('\n')}
---

## Overview

Write about your project here...

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Details

Explain the technical implementation...

## Challenges & Solutions

What problems did you solve?

## Results

What was the outcome? What did you learn?
`

  const projectsDir = path.join(process.cwd(), 'content', 'projects')

  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true })
  }

  const filePath = path.join(projectsDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Error: Project with slug "${slug}" already exists!\n`)
    rl.close()
    process.exit(1)
  }

  fs.writeFileSync(filePath, frontmatter)

  console.log(`\n✅ Project added successfully!\n`)
  console.log(`📁 File: content/projects/${slug}.md`)
  console.log(`🔗 URL: /works/${slug}`)
  console.log(`\n📝 Edit the file to complete your project description.\n`)

  rl.close()
}

createProject().catch(error => {
  console.error('\n❌ Error:', error.message)
  rl.close()
  process.exit(1)
})
