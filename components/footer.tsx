const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Ajitesh Panda
          </p>

          <div className="flex items-center gap-1 text-muted-foreground">
            <a
              href="https://github.com/ajitesh13"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="https://twitter.com/iamAjiteshp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="https://www.instagram.com/_beingbest/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
