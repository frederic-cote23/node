const fs = require('fs');

const meta_file_name = "app_meta.json";
const app_meta_file = fs.readFileSync(meta_file_name);
const all_app_meta = JSON.parse(app_meta_file);
const app_language_list_file = "app_language_list.json";

let all_languages = []

Object.keys(all_app_meta).forEach(function (app){

    let app_languages = all_app_meta[app]['languages'];

    for (const language in app_languages){

        if (all_languages.indexOf(app_languages[language]) > -1) {
            //In the array!
        } else {
            all_languages.push(app_languages[language]);
        }

    }

});

fs.writeFile(app_language_list_file, JSON.stringify(all_languages), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved");
        console.log("Number of App: "+Object.keys(all_languages).length)
    }
});