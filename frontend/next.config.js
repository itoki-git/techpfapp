const withSass = require('@zeit/next-sass');
module.exports = {
  cssModules: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    'fontawesome-svg-core': {
      license: 'free',
    },
  },
  webpack5: true,
};
