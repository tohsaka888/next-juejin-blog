/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['p3-juejin.byteimg.com', 'p6-juejin.byteimg.com'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default nextConfig
