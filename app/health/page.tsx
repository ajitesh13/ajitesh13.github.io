import type { Metadata } from 'next'
import { HealthTracker } from '@/components/HealthTracker'

export const metadata: Metadata = {
  title: 'Health & Nutrition Tracker',
  description:
    'A personal macro and nutrition tracking tool for logging meals and daily goals.',
  alternates: { canonical: '/health' }
}

export default function Health() {
  return (
    <>
      <section className="section-container py-12 bg-paper text-ink">
        <p className="font-body text-ink-soft">
          A lightweight tool I built to track daily macros and nutrition
          goals.
        </p>
      </section>
      <HealthTracker />
    </>
  )
}
