# Content Management System

All website content is managed through Markdown files in this directory. Each content type has its own system with scripts for easy content creation.

---

## 📝 1. Blog Posts

**Location:** `content/blogs/`  
**URL Pattern:** `/blogs/[slug]`

### Format

```markdown
---
title: 'Your Blog Title'
subtitle: 'A brief description'
date: 'YYYY-MM-DD'
tags: ['Tag1', 'Tag2']
---

Your markdown content here...
```

### Add New Blog

```bash
pnpm new-blog
```

**Prompts:**

1. Title → Auto-generates slug
2. Subtitle → Shows under title
3. Tags → Comma-separated (e.g., "Next.js, React, TypeScript")

**Auto-generates:**

- ✅ Slug from title (e.g., "My Post" → `my-post.md`)
- ✅ Current date automatically
- ✅ Markdown template
- ✅ Reading time (calculated automatically)

**Example:** `content/blogs/my-journey-with-next-js-15.md`

---

## 📚 2. Books

**Location:** `content/books/`  
**URL Pattern:** `/books/[slug]`

### Format

```markdown
---
title: 'Book Title'
author: 'Author Name'
year: '2024'
rating: 5
coverImage: '/images/books/book-cover.jpg'
keyTakeaways:
  - Key point 1
  - Key point 2
  - Key point 3
---

Your book review/notes here...
```

### Add New Book

```bash
pnpm new-book
```

**Prompts:**

1. Book Title
2. Author
3. Year Read
4. Rating (1-5 stars)
5. Cover Image Path
6. Key Takeaways (comma-separated)

**Features:**

- ✅ Star rating display (⭐⭐⭐⭐⭐)
- ✅ Cover image + book details layout
- ✅ Key takeaways section
- ✅ Full markdown review

**Example:** `content/books/atomic-habits.md`

---

## 🚀 3. Projects

**Location:** `content/projects/`  
**URL Pattern:** `/works/[slug]`

### Format

```markdown
---
title: 'Project Name'
description: 'Short description'
year: '2021'
platform: 'Web, iOS, Android'
stack: 'React, Node.js, PostgreSQL'
github: 'https://github.com/username/repo'
thumbnail: '/images/works/project-thumb.png'
images:
  - '/images/works/screenshot1.png'
  - '/images/works/screenshot2.png'
---

## Overview

Project details using markdown...
```

### Add New Project

```bash
pnpm new-project
```

**Prompts:**

1. Project Title
2. Short Description (for listing page)
3. Year
4. Platform
5. Tech Stack
6. GitHub URL
7. Thumbnail Image Path
8. Additional Images (comma-separated)

**Features:**

- ✅ Grid view on projects page
- ✅ Multiple images support
- ✅ GitHub link button
- ✅ Technical details display

**Example:** `content/projects/webedge.md`

---

## 📸 4. Photos

**Location:** `content/photos/`  
**URL Pattern:** `/posts/[slug]`

### Format

```markdown
---
title: 'Photo Collection Title'
location: 'City, Country'
date: 'YYYY-MM-DD'
camera: 'Camera Model' # Optional
lens: 'Lens Details' # Optional
images:
  - '/images/wallpapers/collection/photo1.jpg'
  - '/images/wallpapers/collection/photo2.jpg'
---

The story behind these photos...
```

### Add New Photo Collection

```bash
pnpm new-photo
```

**Prompts:**

1. Title
2. Location
3. Date (YYYY-MM-DD)
4. Camera (optional)
5. Lens (optional)
6. Image Paths (comma-separated)

**Features:**

- ✅ 3-column grid on listing page
- ✅ 2-column gallery on detail page
- ✅ Camera/lens metadata
- ✅ Date and location display

**Example:** `content/photos/cherry-blossoms-2024.md`

---

## 📋 General Guidelines

### File Naming

- **Always use kebab-case**: `my-awesome-post.md`
- **No special characters**: Only letters, numbers, hyphens
- **Filename = URL slug**: `my-post.md` → `/blogs/my-post`

### Image Management

1. Place images in `/public/images/`
2. Reference with path: `/images/folder/image.jpg`
3. Organize by type:
   - Books: `/images/books/`
   - Projects: `/images/works/`
   - Photos: `/images/wallpapers/`

### Markdown Features

- ✅ Headings (H2, H3)
- ✅ Lists (bullet, numbered)
- ✅ Links (auto-opens in new tab)
- ✅ Bold, italic
- ✅ Code (inline and blocks)
- ✅ Blockquotes
- ✅ Tables (via remark-gfm)

---

## 🎯 Quick Reference

| Content Type | Command            | Location            | URL             |
| ------------ | ------------------ | ------------------- | --------------- |
| Blog         | `pnpm new-blog`    | `content/blogs/`    | `/blogs/[slug]` |
| Book         | `pnpm new-book`    | `content/books/`    | `/books/[slug]` |
| Project      | `pnpm new-project` | `content/projects/` | `/works/[slug]` |
| Photo        | `pnpm new-photo`   | `content/photos/`   | `/posts/[slug]` |

---

## ✨ Features

- **Auto-reading time** (blogs only)
- **Auto-date formatting** (all content)
- **Static generation** (all pages pre-rendered at build)
- **SEO optimized** (metadata from frontmatter)
- **Type-safe** (TypeScript interfaces for all content)
- **Fast navigation** (prefetching enabled)

---

## 🔄 Workflow

### Adding Content

1. **Run the script**: `pnpm new-[type]`
2. **Answer prompts**: Fill in the details
3. **Edit the file**: Add your content in Markdown
4. **Test locally**: `pnpm dev`
5. **Build**: `pnpm build`
6. **Deploy**: Push to Git

### Manual Addition

1. Create `.md` file in appropriate `content/[type]/` directory
2. Add frontmatter with all required fields
3. Write content in Markdown
4. Rebuild: `pnpm build`

---

## 📊 Content Stats

Current content (based on samples):

- ✅ 1 Blog post
- ✅ 2 Books
- ✅ 4 Projects
- ✅ 2 Photo collections

---

## 🛠️ Troubleshooting

**Q: Content not showing up?**

- Check frontmatter format is correct
- Ensure file ends with `.md`
- Rebuild: `pnpm build`

**Q: Images not loading?**

- Verify path starts with `/images/`
- Check file exists in `/public/images/`
- Use correct file extension

**Q: Slug already exists?**

- Change the filename
- Or update existing content

---

**Ready to create content?** Use the scripts above and your content will be automatically integrated into the website! 🚀
