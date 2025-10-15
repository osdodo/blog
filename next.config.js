/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow static export to emit <img> tags instead of using the image optimizer.
    unoptimized: true,
  },
};

module.exports = nextConfig;
