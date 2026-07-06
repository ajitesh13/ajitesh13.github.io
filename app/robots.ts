import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = 'https://ajitesh13.github.io'

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Bytespider',
  'Applebot-Extended',
  'Amazonbot'
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map(userAgent => ({ userAgent, allow: '/' }))
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL
  }
}
