module.exports = {
  reactStrictMode: true,
  // Proxy to avoid CORS error with OM2M
  async rewrites() {
    return [
      {
        source: '/api/om2m/:path*',
        destination: 'http://localhost:8282/:path*',
      },
    ];
  },
};
