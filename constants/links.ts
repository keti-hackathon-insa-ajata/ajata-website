export default {
  liveReports: '/api/mock', // http://192.168.43.129:12345/dangerReports
  localMarkers: '/api/markers',
  om2mEndpoint:
    '/api/om2m/~/' + process.env.om2mMnCseName + '/AjataSensor/DATA',
};
