import { ReactNode } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
