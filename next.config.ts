import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resource.hanteochart.io",
      },
    ],
  },
};

export default nextConfig;
