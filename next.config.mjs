/** @type {import('next').NextConfig} */
const nextConfig = {
  // define domain that "next/image" can use
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
