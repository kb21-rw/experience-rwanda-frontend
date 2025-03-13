/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.IMAGE_HOSTNAME || "",
      },
      {
        hostname: process.env.IMAGE_HOSTNAME2 || "",
      },
    ],
  },
};

export default nextConfig;
