/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'logo.clearbit.com',
        }
      ]
    },
  //   experimental: {
  //     instrumentationHook: true,
  // }
};

export default nextConfig;
