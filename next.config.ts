import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cuchd.in",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.cuchd.in",
      },
      {
        protocol: "https",
        hostname: "shivalikcollege.edu.in",
      },
      {
        protocol: "https",
        hostname: "cheerful-seahorse-57614e.netlify.app",
      },
    ],
  },
};

export default nextConfig;
