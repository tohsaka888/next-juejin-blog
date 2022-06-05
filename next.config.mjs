/** @type {import('next').NextConfig} */

import removeImport from 'next-remove-imports';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['p3-juejin.byteimg.com', 'p6-juejin.byteimg.com'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}



export default removeImport()(nextConfig);
