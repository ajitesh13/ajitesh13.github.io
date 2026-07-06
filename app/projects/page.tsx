import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects' }
}

export default function Projects() {
  const projects = getAllProjects()

  return (
    <MainLayout>
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl">
              Projects
            </h1>
            <p className="font-body text-lg text-ink-soft">
              A collection of my work and side projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
              <Link
                key={project.slug}
                href={`/works/${project.slug}`}
                prefetch={true}
                className="block group"
              >
                <div className="space-y-4">
                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden border border-hairline">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} thumbnail`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-mono text-ink-soft">
                        {project.year}
                      </span>
                      <h3 className="font-display text-xl font-semibold group-hover:text-bamboo transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="font-body text-ink-soft">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
