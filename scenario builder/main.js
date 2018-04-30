//Source: https://www.npmjs.com/package/request
var request = require('request');
/*
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
*/
const apiSearch = 'rest/search/v2/';

const searchRequestParam = {
    'access_token': 'xxcb8b6a78-16a2-4aec-b9a6-27df2ea0f5bc',
    'organizationId': 'coveolearningbasicanalytics',
    'uri': 'https://platform.cloud.coveo.com/'+apiSearch
};

request(searchRequestParam, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
});