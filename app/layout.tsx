import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ajitesh Panda - Full Stack Developer',
    template: '%s | Ajitesh Panda'
  },
  description: 'Full Stack Developer, SDE2 at HackerRank. Passionate about web development, LLMs, and building exciting products.',
  keywords: ['Ajitesh Panda', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'HackerRank'],
  authors: [{ name: 'Ajitesh Panda' }],
  creator: 'Ajitesh Panda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ajitesh13.github.io',
    title: 'Ajitesh Panda - Full Stack Developer',
    description: 'Full Stack Developer, SDE2 at HackerRank',
    siteName: 'Ajitesh Panda Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajitesh Panda - Full Stack Developer',
    description: 'Full Stack Developer, SDE2 at HackerRank',
    creator: '@iamAjiteshp'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-8SYFHFEER9" />
      </body>
    </html>
  )
}

