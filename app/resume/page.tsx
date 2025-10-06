'use client'

import { useEffect } from 'react'
import MainLayout from '@/components/layouts/main-layout'
import { Loader2 } from 'lucide-react'

export default function Resume() {
  useEffect(() => {
    window.location.href =
      'https://drive.google.com/file/d/15dV_HWITZYi72DY9X73BvIzFpSmTwhQH/view?usp=sharing'
  }, [])

  return (
    <MainLayout>
      <section className="section-container py-32">
        <div className="flex flex-col items-center justify-center gap-8">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <h1 className="text-3xl font-bold text-center">
            Redirecting to resume...
          </h1>
        </div>
      </section>
    </MainLayout>
  )
}

