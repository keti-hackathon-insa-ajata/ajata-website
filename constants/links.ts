export default {
  liveReports: process.env.restApiEndpoint, // '/api/mock',
  localMarkers: '/api/markers',
  om2mEndpoint:
    '/api/om2m/~/' +
    process.env.om2mMnCseName +
    '/' +
    process.env.om2mAE +
    '/DATA',
};
