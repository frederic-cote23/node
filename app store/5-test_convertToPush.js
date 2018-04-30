const fs = require('fs');

var file_to_process = fs.readFileSync("test_app_meta.json");

var jsonContent = JSON.parse(file_to_process);

var finalList = { "addOrUpdate":[]};

Object.keys(jsonContent).forEach(function (app){

    finalList["addOrUpdate"].push(jsonContent[app]);

});

fs.writeFile('test_push_api.json', JSON.stringify(finalList), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved");
        console.log("Number of App: "+Object.keys(finalList).length)
    }
    });