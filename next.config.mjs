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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
