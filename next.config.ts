import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/skills", destination: "/" },
      { source: "/project", destination: "/" },
      { source: "/contact", destination: "/" },
    ];
  },
};

export default nextConfig;
