const fs = require('fs');

//INPUT - Content
const app_content_repo = '3_AppContent/';
const content_files = extractFileList(app_content_repo);

//INPUT - Meta
const meta_file_name = "app_meta.json";
const app_meta_file = fs.readFileSync(meta_file_name);
const all_app_meta = JSON.parse(app_meta_file);

//Output
const merged_file_name = "app_metaAndContent.json"
let app_merged = {}

function extractFileList(app_content_repo){

    let file_list = []

    fs.readdirSync(app_content_repo).forEach(file => {
        file_list.push(file);
    })


    var index = file_list.indexOf('.DS_Store');

    if (index > -1) {
        file_list.splice(index, 1);
      }

    return file_list;

}

test_all_app_meta = {}

for (key in content_files){

    let app= JSON.parse(fs.readFileSync(app_content_repo+content_files[key]));

    try {

        all_app_meta[app['name']]['data'] = app['description'];
        //test_all_app_meta[app['name']] = app['description']
        
    } catch (error) {
        console.log("Could not write: "+app['name']);
    }
}

Object.keys(all_app_meta).forEach(function (app){
    if ( all_app_meta[app]['description'] == "" ) {
        delete all_app_meta[app];
        console.log("Was deleted because no content: "+ app);
    }
});

fs.writeFile(merged_file_name, JSON.stringify(all_app_meta), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved");
        console.log("Number of App: "+Object.keys(all_app_meta).length)
    }
});