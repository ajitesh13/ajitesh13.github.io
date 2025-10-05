import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home'
}

const bio = [
  { date: 'Nov, 2000', text: 'Born in Odisha, India.' },
  {
    date: 'Aug, 2018',
    text: 'Completed my High School and started my undergrad at IIIT in CSE'
  },
  {
    date: 'Oct, 2019',
    text: 'Started contributing to Mozilla in their WebExtensions and Devtools team'
  },
  { date: 'Feb, 2020', text: 'Got Level 2 Commit Access at Mozilla!' },
  {
    date: 'Aug, 2020',
    text: 'Elected as the Secretary of the Programming Society IIIT-Bh'
  },
  {
    date: 'Sept, 2020',
    text: 'Selected as a Fellow at Major League Hacking'
  },
  { date: 'July, 2021', text: 'Started as an SDE Intern for intervue.io' },
  { date: 'Jan, 2022', text: 'Started as an SDE Intern for HackerRank' },
  {
    date: 'July, 2022',
    text: 'Graduated from IIIT Bhubaneswar as BTech in CSE'
  },
  { date: 'Oct, 2023', text: 'Promoted to SDE2 at HackerRank' }
]

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section-container py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Ajitesh Panda
            </h1>
            <p className="text-xl text-white/60">
              Full Stack Developer at HackerRank
            </p>
          </div>

          <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
            <p>
              Hi! Thanks a lot for visiting my site. My name is Ajitesh, and I
              am a software engineer currently working as an SDE2 at HackerRank.
              I completed my BTech in Computer Science and Engineering from IIIT
              Bhubaneswar, graduating in 2022.
            </p>
            <p>
              I am a web enthusiast with strong expertise in JavaScript and
              React, but I have also tinkered around with a variety of
              technologies such as LLMs, VLMs, Cloud Native, Blockchain,
              Flutter, Webextensions, and game development using Godot and
              Unity.
            </p>
            <p>
              I am a digital craftsman at heart and have a strong passion for
              entrepreneurship. I love to create exciting products in new
              technologies and would be thrilled to discuss any ideas that you
              are excited about!
            </p>
          </div>

          <div>
            <Button size="lg" asChild>
              <Link
                href="/projects"
                prefetch={true}
                className="inline-flex items-center"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-container py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-white">Timeline</h2>

          <div className="space-y-4">
            {bio.map((item, index) => (
              <div key={index} className="flex gap-6 text-white/80">
                <div className="flex-shrink-0 w-28 text-sm font-mono text-white/60">
                  {item.date}
                </div>
                <div className="flex-1">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="section-container py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white">Interests</h2>
          <p className="text-lg text-white/80">
            Art, Music, Travelling, Photography and of course, building exciting
            products!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
          <p className="text-white/80">
            Got an exciting project or idea? I'd love to hear about it.
          </p>
          <div>
            <Button size="lg" asChild>
              <a href="mailto:ajiteshpanda2000@gmail.com">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
