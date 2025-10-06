import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const homeFilePath = path.join(process.cwd(), 'content/home.md')

export interface TimelineItem {
  date: string
  text: string
}

export interface HomeContent {
  greeting: string
  name: string
  tagline: string
  bio: string[]
  timeline: TimelineItem[]
  interests: string
  cta: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export function getHomeContent(): HomeContent {
  const fileContents = fs.readFileSync(homeFilePath, 'utf8')
  const { data } = matter(fileContents)

  return {
    greeting: data.greeting || "Hello, I'm a Hacker from India! 👋",
    name: data.name || 'Ajitesh Panda',
    tagline: data.tagline || 'Full Stack Developer',
    bio: data.bio || [],
    timeline: data.timeline || [],
    interests: data.interests || '',
    cta: data.cta || {
      title: "Let's Connect",
      description: 'Got an exciting project or idea?',
      buttonText: 'Get in Touch',
      buttonLink: 'mailto:ajiteshpanda2000@gmail.com'
    }
  }
}
