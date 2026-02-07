import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "*",
      "nyc3.digitaloceanspaces.com",
      "mijnvmta.ams3.digitaloceanspaces.com",
      "smtech-space.nyc3.digitaloceanspaces.com",
      "lh3.googleusercontent.com",
      "api.zenexcloud.com",
    ], // Allows all domains (use with caution; see Next.js docs)
  },
};

export default nextConfig;
