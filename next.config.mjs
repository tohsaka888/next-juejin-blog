/** @type {import('next').NextConfig} */
import MDXProvider from '@next/mdx'
import remarkPrism from 'remark-prism'


const withMDX = MDXProvider(
  {
    options: {
      remarkPlugins: [
        remarkPrism,
      ],
      rehypePlugins: [],
    }
  }
)

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['p3-juejin.byteimg.com'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
