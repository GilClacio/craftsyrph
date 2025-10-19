const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/craftsyrph' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/craftsyrph' : ''
};

module.exports = nextConfig;
