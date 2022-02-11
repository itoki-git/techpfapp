const withSass = require('@zeit/next-sass');
module.exports = {
  reactStrictMode: true,
  cssModules: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack5: true,
};
