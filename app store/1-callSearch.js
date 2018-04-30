var store = require('app-store-scraper');
var fs = require('fs');

/*
    Def: Uses the app-store scraper npm to call the App Store API
    Input: 
        keyword = The keyword to Query
        page = The number of the page on which to extract dats
    Source: https://www.npmjs.com/package/app-store-scraper
*/
function callAPI(keyword, page) {
    return store.search({
        term: keyword,
        num: 200,
        page: page,
        country : 'us',
        lang: 'en-us'
      })

}//end doSomethingAsync


/*
    Def: Call the callAPI function and extract its reponse in a File
    Input:
        keyword = The keyword to Query
    
    Relevant Param:
        maxNumberOfPage = Controls how many pages will be browsed by callAPI for each Keywords. 5 => +-1 000 results because throtle to 200 per page
*/

function searchAppStore(keyword, filePath) {
    let i;
    let promises = [];
    let maxNumberOfPage = 5

    for (i = 1; i <= maxNumberOfPage; ++i) {
        promises.push(callAPI(keyword, i));
    }

    /*
        promises = []
            promises = [ ["FirstCall"], ["SecondCall"] ]
                promises = [ ["FirstCall_Object1", FirstCall_Object2"], ["SecondCall_Object1", "SecondCall_Object2"] ]
    */

    //Proccess all the promises at the same time
    Promise.all(promises).then((rawResponse) => {

        var desiredMetadataKeys = ["id", "appId", "title", "url", "icon",
        "genres", "genreIds", "primaryGenre", "primaryGenreId", "contentRating",
            "languages", "size", "requiredOsVersion", "released", "updated", "version",
            "price", "currency", "free", "developerId", "developer", "developerUrl",
            "developerWebsite", "score", "reviews", "currentVersionScore", "currentVersionReviews"]
        
        var cleanResponse = {};

        //Parse each Call
        rawResponse.forEach(function(call){
            //Parse each App inside the Call
            call.forEach(function(app){

                cleanResponse[app["title"]] = {};
            
                for (var i = 0; i < desiredMetadataKeys.length; i++) {
            
                    cleanResponse[app["title"]][desiredMetadataKeys[i]] = app[desiredMetadataKeys[i]];
                }

            });//end parse each App

        });//end parse each Call

        fs.writeFile(filePath+'result_'+keyword+'.json', JSON.stringify(cleanResponse), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved");
                console.log("Number of App: "+Object.keys(cleanResponse).length)
            }
            });

    }).catch((e) => {
        // Handle errors here
    });
}

function getDictionnary(dicFile){
    var keywords = []
    var array = fs.readFileSync(dicFile).toString().split("\n");
    
    for(i in array) {
        keywords.push(array[i])
    }

    return keywords
}

async function delay(){
    return new Promise (resolve => setTimeout(resolve, 5000));
}

async function delayedCall(item){
    await delay();
    searchAppStore(item, filePath);
}

async function processArray(array, filePath){
    for (const item of array){
        await delayedCall(item, filePath);
    }
}

var keywords = getDictionnary('dictionary/q.txt')
var filePath = '1_SearchResults/'

processArray(keywords, filePath)


