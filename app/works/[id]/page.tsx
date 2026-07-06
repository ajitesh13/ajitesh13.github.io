import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { JsonLd } from '@/components/JsonLd'
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
    description: project.description,
    alternates: { canonical: `/works/${id}` }
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

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `https://ajitesh13.github.io/works/${project.slug}`,
    creator: { '@type': 'Person', name: 'Ajitesh Panda' },
    ...(project.github && { codeRepository: project.github })
  }

  return (
    <MainLayout>
      <JsonLd data={projectSchema} />
      <section className="section-container py-20 bg-paper text-ink min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            href="/projects"
            prefetch={true}
            className="font-mono text-sm text-ink-soft hover:text-ink transition-colors inline-block"
          >
            ← Back to Projects
          </Link>

          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-mono text-ink-soft">
                {project.year}
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl">
                {project.title}
              </h1>
            </div>

            <p className="font-body text-xl text-ink-soft">{project.description}</p>

            <div className="flex gap-8 text-sm font-mono">
              <div>
                <span className="text-ink-soft">Platform:</span>{' '}
                <span className="text-ink">{project.platform}</span>
              </div>
              <div>
                <span className="text-ink-soft">Stack:</span>{' '}
                <span className="text-ink">{project.stack}</span>
              </div>
            </div>

            {project.github && (
              <div>
                <Button
                  size="sm"
                  asChild
                  className="bg-ink text-paper hover:bg-ink/90 font-mono"
                >
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
            <div className="relative w-full h-96 overflow-hidden border border-hairline">
              <Image
                src={project.images[0]}
                alt={`${project.title} — ${project.description}`}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="font-body max-w-none space-y-6 text-ink/90 leading-relaxed border-t border-hairline pt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="font-display font-bold text-ink text-2xl mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display font-bold text-ink text-xl mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-ink/90 leading-relaxed my-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 list-disc list-inside text-ink/90 my-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-2 list-decimal list-inside text-ink/90 my-4">
                    {children}
                  </ol>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-bamboo hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="font-mono bg-paper-deep border border-hairline px-1.5 py-0.5 text-sm text-ink">
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
              className="relative w-full h-96 overflow-hidden border border-hairline"
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
