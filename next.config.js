/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  turbopack: {
    root: __dirname
  }
}

module.exports = nextConfig
