import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ceremony-florals/:path*", destination: "/", permanent: false },
      { source: "/personal-flowers", destination: "/", permanent: false },
      { source: "/reception-florals", destination: "/", permanent: false },
      { source: "/statement-florals", destination: "/", permanent: false },
      { source: "/loose-stems-diy", destination: "/", permanent: false },
      { source: "/design-studio", destination: "/", permanent: false },
      { source: "/weddings", destination: "/", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/shop", destination: "/", permanent: false },
      { source: "/originals", destination: "/", permanent: false },
      { source: "/seasonal", destination: "/", permanent: false },
      { source: "/visit", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
