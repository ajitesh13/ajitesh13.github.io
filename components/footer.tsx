const Footer = () => {
  return (
    <footer className="border-t border-hairline bg-paper mt-20">
      <div className="section-container py-8">
        <p className="text-sm font-mono text-ink-soft">
          © {new Date().getFullYear()} Ajitesh Panda
        </p>
      </div>
    </footer>
  )
}

export default Footer
