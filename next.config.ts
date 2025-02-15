import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lnpcuuffgsnkldejvkzq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // minimumCacheTTL: 60,
    domains: ["lnpcuuffgsnkldejvkzq.supabase.co"],
  },
};

export default nextConfig;
