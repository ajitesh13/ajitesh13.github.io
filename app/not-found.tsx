import Link from 'next/link'
import MainLayout from '@/components/layouts/main-layout'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <MainLayout>
      <section className="section-container py-32">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-8xl font-bold text-white">404</h1>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
            <p className="text-lg text-white/60">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div>
            <Button size="lg" asChild>
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
