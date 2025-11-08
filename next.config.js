/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  env: { CUSTOM_KEY: process.env.CUSTOM_KEY },
  serverExternalPackages: ['@prisma/client'],

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://partner.googleadservices.com https://adservice.google.com https://googleads.g.doubleclick.net;",
              "frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com;",
              "img-src 'self' data: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net;",
              "style-src 'self' 'unsafe-inline';",
              "font-src 'self' data:;",
              // ✅ Add your backend / API domain here:
              "connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://infragrid.v.network;",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
