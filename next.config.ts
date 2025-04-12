import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
      },
      {
        protocol: "https",
        hostname: "sun9-78.userapi.com",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  }
};

export default nextConfig;
