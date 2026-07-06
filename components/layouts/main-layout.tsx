import { ReactNode } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { getHomeContent } from '@/lib/home'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { social } = getHomeContent()

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar githubUrl={social.github} />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
