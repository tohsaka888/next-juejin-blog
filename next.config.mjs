/** @type {import('next').NextConfig} */

import removeImport from "next-remove-imports";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "p3-juejin.byteimg.com",
      "p6-juejin.byteimg.com",
      "s1.aigei.com",
      "s1.ax1x.com",
    ],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
};

export default removeImport()(nextConfig);
