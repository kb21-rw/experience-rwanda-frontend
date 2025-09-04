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
      {
        hostname: "res.cloudinary.com",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
