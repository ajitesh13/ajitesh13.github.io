import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const homeFilePath = path.join(process.cwd(), 'content/home.md')

export interface TimelineItem {
  date: string
  text: string
}

export interface Venture {
  name: string
  tag: string
  description: string
  link: string
  primary: boolean
}

export interface SocialLinks {
  github: string
  twitter: string
  instagram: string
}

export interface HomeContent {
  greeting: string
  name: string
  tagline: string
  highlights: string
  bio: string[]
  timeline: TimelineItem[]
  interests: string
  social: SocialLinks
  ventures: Venture[]
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
    highlights: data.highlights || '',
    bio: data.bio || [],
    timeline: data.timeline || [],
    interests: data.interests || '',
    social: data.social || {
      github: 'https://github.com/ajitesh13',
      twitter: 'https://twitter.com/iamAjiteshp',
      instagram: 'https://www.instagram.com/_beingbest/'
    },
    ventures: data.ventures || [],
    cta: data.cta || {
      title: "Let's Connect",
      description: 'Got an exciting project or idea?',
      buttonText: 'Get in Touch',
      buttonLink: 'mailto:ajiteshpanda2000@gmail.com'
    }
  }
}
