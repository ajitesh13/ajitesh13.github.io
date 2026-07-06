'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function ResumeRedirect() {
  useEffect(() => {
    window.location.href =
      'https://drive.google.com/file/d/15dV_HWITZYi72DY9X73BvIzFpSmTwhQH/view?usp=sharing'
  }, [])

  return (
    <section className="section-container py-32 bg-paper text-ink min-h-screen">
      <div className="flex flex-col items-center justify-center gap-8">
        <Loader2 className="h-16 w-16 animate-spin text-seal" />
        <h1 className="font-display font-bold text-3xl text-center">
          Redirecting to resume...
        </h1>
      </div>
    </section>
  )
}
