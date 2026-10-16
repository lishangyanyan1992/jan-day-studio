import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ceremony-florals/:path*", destination: "/weddings", permanent: false },
      { source: "/personal-flowers", destination: "/weddings", permanent: false },
      { source: "/reception-florals", destination: "/weddings", permanent: false },
      { source: "/statement-florals", destination: "/weddings", permanent: false },
      { source: "/loose-stems-diy", destination: "/weddings", permanent: false },
      { source: "/design-studio", destination: "/originals", permanent: false },
    ];
  },
};

export default nextConfig;
