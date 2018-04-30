const fs = require('fs');
const searchResultRepository = './1_SearchResults/';
const searchResultRepo = '1_SearchResults/'
const output_file_name = 'app_meta.json'

function extractFileList(searchResultRepository){

    let file_list = []

    fs.readdirSync(searchResultRepository).forEach(file => {
        file_list.push(file);
    })


    var index = file_list.indexOf('.DS_Store');

    if (index > -1) {
        file_list.splice(index, 1);
      }

    return file_list

}

function createCleanFile(fileList, mandatoryKeys){
    
    var processedFile = {}

    //fileList.length
    for (var i = 0; i < fileList.length; i++ ){
        console.log(fileList[i]);
        var content = fs.readFileSync(searchResultRepo+fileList[i]);

        //Extract the file content
        var jsonContent = JSON.parse(content);

        //Check if the Name of the app is already in    processedFile
        Object.keys(jsonContent).forEach( function (app){
    
            var addApp = true;

            if ( (app in processedFile)) {

                console.log(app + "Is already in the processed file.")

            }
    
            else{
                
               //Make sure all metadata is there  
                for (var j = 0; j<mandatoryKeys.length; j++){
                    if ( !(mandatoryKeys[j] in jsonContent[app]) ){
                        addApp = false;
                        //console.log(app+" does have: "+mandatoryKeys[j]+" key")
                        break;
                    }
                }

                if(addApp){
                    processedFile[app] = jsonContent[app];
                    processedFile[app]["appsize"] = processedFile[app]['size']/1000000;
                    delete processedFile[app]['size'];
                    processedFile[app]["filetype"] = "html";
                    processedFile[app]["author"] = "App Store";
                    processedFile[app]["date"] = "2018-01-01T12:18:41.666Z";
                    processedFile[app]["documenttype"] = "html";
                    processedFile[app]["filename"] = app;
                    processedFile[app]["fileExtension"] = ".html";
                    processedFile[app]["sourcetype"] = "Push";
                    processedFile[app]["data"] = "";
                    processedFile[app]["documentId"] = processedFile[app]["url"];
                    processedFile[app]["permissions"] = [           
                        {
                        "allowAnonymous": true,
                        "allowedPermissions": [
                          {
                            "identity": "*@*",
                            "identityType": "User"
                          }
                        ]
                      } ];
                }

            }


        } );

    } 
    //If not, add it to the     processedFile
    fs.writeFile(output_file_name, JSON.stringify(processedFile), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved");
            console.log("Number of App: "+Object.keys(processedFile).length)
        }
        });


}

const fileList = extractFileList(searchResultRepository)

const mandatoryKeys = ["score", "reviews", "currentVersionScore", "currentVersionReviews", "genres", "version", "developer", "requiredOsVersion", "contentRating", "genres", "primaryGenre", "free", "price"]

createCleanFile(fileList, mandatoryKeys)


/*
    */

/*
var processedFile = {}

//Create a list of all json in directory    searchResults

//For each file in the directory
var content = fs.readFileSync("searchResults/result_after school.json");
    //Extract the file content
    var jsonContent = JSON.parse(content);

    //Check if the Name of the app is already in    processedFile
    Object.keys(jsonContent).forEach( function (app){

        if ( !(app in processedFile) ) {
            processedFile[app] = jsonContent[app]
        }

    } );

        //If not, add it to the     processedFile

fs.writeFile('clean.json', JSON.stringify(processedFile), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved");
        console.log("Number of App: "+Object.keys(processedFile).length)
    }
    });
*/
