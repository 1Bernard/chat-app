import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '169.254.0.0/16',
    '192.168.0.0/16',
    '10.0.0.0/8'
  ]
};

export default nextConfig;
