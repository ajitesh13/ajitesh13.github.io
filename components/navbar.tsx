'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  githubUrl: string
}

const Navbar = ({ githubUrl }: NavbarProps) => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blog' },
    { href: '/books', label: 'Books' },
    { href: '/posts', label: 'Through My Lens' }
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-paper border-b border-hairline">
      <div className="section-container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className="mr-8 flex items-center space-x-2"
            prefetch={true}
          >
            <span className="hidden font-display font-bold sm:inline-block text-ink tracking-tight">
              Ajitesh Panda
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-mono text-ink-soft">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={cn(
                  'transition-colors hover:text-ink',
                  isActive(item.href) ? 'text-bamboo' : 'text-ink-soft'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile */}
        <button
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-ink"
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="ml-2 font-mono">Menu</span>
        </button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Placeholder for search */}
          </div>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-ink hover:bg-paper-deep"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="/resume"
                target="_blank"
                prefetch={true}
                className="text-ink font-mono hover:text-ink hover:bg-paper-deep"
              >
                Resume
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-paper">
          <nav className="grid gap-2 p-4 font-mono">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sm transition-colors hover:bg-paper-deep',
                  isActive(item.href) ? 'text-bamboo bg-paper-deep' : 'text-ink-soft'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
