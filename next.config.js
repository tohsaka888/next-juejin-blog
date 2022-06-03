/** @type {import('next').NextConfig} */
const path = require('path')

const withMDX = require('@next/mdx')(
  {
    extension: /\.mdx?$/,
    options: {
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [],
      rehypePlugins: [],
    }
  }
)

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['p3-juejin.byteimg.com'],
  },
}

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
