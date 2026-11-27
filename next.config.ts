import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { qualities: [75, 90] },
  // Old single-page routes now point at the matching section, so shared links keep working.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/skills", destination: "/#services", permanent: false },
      { source: "/project", destination: "/#work", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
