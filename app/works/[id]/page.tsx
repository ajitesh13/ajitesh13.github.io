import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map(project => ({
    id: project.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = getProjectBySlug(id)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.description
  }
}

export default async function WorkPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectBySlug(id)

  if (!project) {
    notFound()
  }

  return (
    <MainLayout>
      <section className="section-container py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            href="/projects"
            prefetch={true}
            className="text-accent-link hover:text-accent-link/80 transition-colors inline-block"
          >
            ← Back to Projects
          </Link>

          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-mono text-white/40">
                {project.year}
              </span>
              <h1 className="text-4xl md:text-5xl heading-mono text-white">
                {project.title}
              </h1>
            </div>

            <p className="text-xl text-white/60">{project.description}</p>

            <div className="flex gap-8 text-sm">
              <div>
                <span className="text-white/40">Platform:</span>{' '}
                <span className="text-white/80">{project.platform}</span>
              </div>
              <div>
                <span className="text-white/40">Stack:</span>{' '}
                <span className="text-white/80">{project.stack}</span>
              </div>
            </div>

            {project.github && (
              <div>
                <Button size="sm" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub →
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Main Image */}
          {project.images[0] && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden border border-white/10">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed section-divider pt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl heading-mono text-white mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl heading-mono text-white mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-white/80 leading-relaxed my-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 list-disc list-inside text-white/80 my-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-2 list-decimal list-inside text-white/80 my-4">
                    {children}
                  </ol>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-accent-link hover:text-accent-link/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-white/10 px-1 py-0.5 rounded text-sm">
                    {children}
                  </code>
                )
              }}
            >
              {project.content}
            </ReactMarkdown>
          </div>

          {/* Additional Images */}
          {project.images.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative w-full h-96 rounded-lg overflow-hidden border border-white/10"
            >
              <Image
                src={image}
                alt={`${project.title} screenshot ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  )
}
