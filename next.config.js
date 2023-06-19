// next.config.js
const nextConfig = {
  images: {
    domains: ['relatorio-codex-bucket.s3.amazonaws.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
