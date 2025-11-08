/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Enable server-side features on Vercel
  serverExternalPackages: ['@prisma/client'],

  // ✅ Add security headers including CSP for AdSense
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              // ✅ Allow Google AdSense and related ad networks
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://partner.googleadservices.com https://adservice.google.com https://googleads.g.doubleclick.net;",
              "frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com;",
              "img-src 'self' data: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net;",
              "style-src 'self' 'unsafe-inline';",
              "font-src 'self' data:;",
              "connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
