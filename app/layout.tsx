import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { JsonLd } from '@/components/JsonLd'
import { getPersonSchema } from '@/lib/schema'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ajitesh13.github.io'),
  title: {
    default: 'Ajitesh Panda - Software Engineer',
    template: '%s | Ajitesh Panda'
  },
  description: 'Software Engineer at Goldcast (Ex-HackerRank). Passionate about web development, LLMs, and building exciting products.',
  keywords: ['Ajitesh Panda', 'Software Engineer', 'React', 'Next.js', 'TypeScript', 'Goldcast', 'HackerRank'],
  authors: [{ name: 'Ajitesh Panda' }],
  creator: 'Ajitesh Panda',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ajitesh13.github.io',
    title: 'Ajitesh Panda - Software Engineer',
    description: 'Software Engineer at Goldcast (Ex-HackerRank)',
    siteName: 'Ajitesh Panda Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajitesh Panda - Software Engineer',
    description: 'Software Engineer at Goldcast (Ex-HackerRank)',
    creator: '@iamAjiteshp'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <JsonLd data={getPersonSchema()} />
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-8SYFHFEER9" />
      </body>
    </html>
  )
}

