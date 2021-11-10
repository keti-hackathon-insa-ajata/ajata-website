module.exports = {
  reactStrictMode: true,
  // Proxy to avoid CORS error with OM2M
  async rewrites() {
    return [
      {
        source: '/api/om2m/:path*',
        destination: 'http://192.168.43.139:8282/:path*',
      },
    ];
  },
  env: {
    om2mMnCseName: 'mn-cse-raspi/mn-raspi',
  },
};
