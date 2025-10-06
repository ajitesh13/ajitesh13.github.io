'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blog' },
    { href: '/books', label: 'Books' },
    { href: '/posts', label: 'Through my lens' }
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="section-container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            prefetch={true}
          >
            <span className="hidden font-bold sm:inline-block text-white">
              Ajitesh Panda
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  isActive(item.href) ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile */}
        <button
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-white"
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="ml-2 font-bold">Menu</span>
        </button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Placeholder for search */}
          </div>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/Ajitesh13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
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
                className="text-white"
              >
                Resume
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10">
          <nav className="grid gap-2 p-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sm transition-colors hover:bg-accent',
                  isActive(item.href)
                    ? 'text-foreground bg-accent'
                    : 'text-foreground/60'
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
