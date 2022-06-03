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
}

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
