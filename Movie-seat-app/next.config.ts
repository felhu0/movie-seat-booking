import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
  basePath: "/movie-seat-booking",
  images: { unoptimized: true },
};

export default nextConfig;
