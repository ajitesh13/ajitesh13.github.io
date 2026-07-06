import Link from 'next/link'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <MainLayout>
      <section className="section-container py-32 bg-paper text-ink min-h-screen">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="font-display font-bold text-8xl">404</h1>
          <div className="space-y-4">
            <h2 className="font-display font-bold text-3xl">Page Not Found</h2>
            <p className="font-body text-lg text-ink-soft">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div>
            <Button size="lg" asChild className="bg-ink text-paper hover:bg-ink/90 font-mono">
              <Link href="/" prefetch={true}>
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
