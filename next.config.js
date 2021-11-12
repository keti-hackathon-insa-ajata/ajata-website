module.exports = {
  reactStrictMode: true,
  // Proxy to avoid CORS error with OM2M
  async rewrites() {
    return [
      {
        source: '/api/om2m/:path*',
        // Adapt this line to the IP address of the Rapsberry Pi
        destination: 'http://192.168.43.139:8282/:path*',
      },
    ];
  },
  env: {
    // The name of the mn-cse running on the Rapsberry Pi
    om2mMnCseName: 'mn-cse-raspi/mn-raspi',
    // The name of the AE where the content instances will be stored
    om2mAE: 'AjataSensor',
    // Adapt this line to the IP address of the central server
    restApiEndpoint: 'http://192.168.43.171:12345/dangerReports?dangerous=true',
  },
};
