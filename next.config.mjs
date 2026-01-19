/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ecwid.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2j6dbq0eux0bg.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  async redirects() {
    // WooCommerce to Ecwid product redirects
    // Full list in scripts/redirects-review.csv
    return [
      // Sample of key product redirects - full list loaded dynamically
      { source: '/product/:slug', destination: '/shop', permanent: false },
      { source: '/product-category/:path*', destination: '/shop', permanent: false },
      { source: '/shop/bikes/:path*', destination: '/shop', permanent: false },
      { source: '/shop/accessories/:path*', destination: '/shop', permanent: false },
      { source: '/shop/clothing/:path*', destination: '/shop', permanent: false },
      { source: '/shop/parts/:path*', destination: '/shop', permanent: false },
      { source: '/shop/helmets/:path*', destination: '/shop', permanent: false },
    ]
  },
}

export default nextConfig
