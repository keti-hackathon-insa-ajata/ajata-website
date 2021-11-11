export default {
  liveReports: 'http://192.168.43.171:12345/dangerReports?dangerous=true', // '/api/mock',
  localMarkers: '/api/markers',
  om2mEndpoint:
    '/api/om2m/~/' + process.env.om2mMnCseName + '/AjataSensor/DATA',
};
