/** @type {import('next').NextConfig} */
// const codesandbox = require('remark-codesandbox');
// const codescreenshot = require('remark-code-screenshot')
// const remarkCapitalize = require('remark-capitalize')
// const admonitions = require('remark-admonitions')
import MDXProvider from '@next/mdx'
import codesandbox from 'remark-codesandbox'
import codescreenshot from 'remark-code-screenshot'
import remarkCapitalize from 'remark-capitalize'
import highlight from 'rehype-highlight'
import rehypePrism from 'rehype-prism-plus'


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
