/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 启用静态导出
  images: {
    // Allow static export to emit <img> tags instead of using the image optimizer.
    unoptimized: true,
  },
  // 确保静态导出时正确处理路径
  trailingSlash: true,
  // 禁用图片优化，因为静态导出不支持
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
