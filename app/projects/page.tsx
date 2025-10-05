import type { Metadata } from 'next'
import MainLayout from '@/components/layouts/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects'
}

export default function Projects() {
  const projects = getAllProjects()

  return (
    <MainLayout>
      <section className="section-container py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Projects
            </h1>
            <p className="text-lg text-white/60">
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
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-mono text-white/40">
                        {project.year}
                      </span>
                      <h3 className="text-xl font-semibold text-white group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-white/60">{project.description}</p>
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
