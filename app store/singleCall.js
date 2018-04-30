var store = require('app-store-scraper');
var fs = require('fs');

var p = 1

var text = store.search({
  term: 'war',
  num: 200,
  page: p,
  country : 'us',
  lang: 'en-us'
}).then( function process(rawResponse){

  console.log("Call: "+p)

  var desiredMetadataKeys = ["id", "appId", "title", "url", "icon",
  "genres", "genreIds", "primaryGenre", "primaryGenreId", "contentRating",
    "languages", "size", "requiredOsVersion", "released", "updated", "version",
    "price", "currency", "free", "developerId", "developer", "developerUrl",
    "developerWebsite", "score", "reviews", "currentVersionScore", "currentVersionReviews"]

  var cleanResponse = {};

  rawResponse.forEach(function(app){
  
    cleanResponse[app["title"]] = {};

    for (var i = 0; i < desiredMetadataKeys.length; i++) {

      cleanResponse[app["title"]][desiredMetadataKeys[i]] = app[desiredMetadataKeys[i]];
    }
  });

  fs.writeFile('result'+p+'.json', JSON.stringify(cleanResponse), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved");
        console.log("Number of App: "+Object.keys(cleanResponse).length)
    }
  });

});//End then