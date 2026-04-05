/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Allow Next.js to run on port 7860 for Hugging Face Spaces
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
