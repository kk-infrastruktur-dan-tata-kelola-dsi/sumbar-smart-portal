/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asset.kompas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.promediateknologi.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'katasumbar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uwitan.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sumbar.kabardaerah.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn0-production-images-kly.akamaized.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'statis.topsumbar.co.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'indonesiakaya.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.promediateknologi.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.rri.co.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/budaya",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "img-src http: https: data: blob: *; media-src http: https: data: blob: *;",
          },
        ],
      },
      {
        source: "/budaya/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "img-src http: https: data: blob: *; media-src http: https: data: blob: *;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
