const fs = require('fs');

//INPUT
const all_apps = "app_metaAndContent.json";
const all_apps_file = fs.readFileSync(all_apps);
const all_apps_json = JSON.parse(all_apps_file);


//<<----- ADDING TOP FREE APPS ----->>
const top_free_ap = "top_free_app.json";
const top_free_ap_file = fs.readFileSync(top_free_ap);
const top_free_ap_json = JSON.parse(top_free_ap_file);

Object.keys(top_free_ap_json).forEach(function (app){

    let app_name = top_free_ap_json[app]['title']

    try {
        all_apps_json[app_name]['apprank'] = app;
        console.log(all_apps_json[app_name]['title']+"is ranked: "+ app);

    } catch (error) {
        console.log("App Not Found"+top_free_ap_json[app])
    }

});

//<<----- ADDING TOP FREE GAMES ----->>
const top_free_games = "top_free_games.json";
const top_free_games_file = fs.readFileSync(top_free_games);
const top_free_games_json = JSON.parse(top_free_games_file);

Object.keys(top_free_games_json).forEach(function (app){

    let app_name = top_free_games_json[app]['title']

    try {
        all_apps_json[app_name]['apprank'] = app;
        console.log(all_apps_json[app_name]['title']+"is ranked: "+ app);

    } catch (error) {
        console.log("App Not Found"+top_free_games_json[app])
    }

});

//<<----- ADDING TOP PAID APPS ----->>
const top_paid_ap = "top_paid_app.json";
const top_paid_ap_file = fs.readFileSync(top_paid_ap);
const top_paid_ap_json = JSON.parse(top_paid_ap_file);

Object.keys(top_paid_ap_json).forEach(function (app){

    let app_name = top_paid_ap_json[app]['title']

    try {
        all_apps_json[app_name]['apprank'] = app;
        console.log(all_apps_json[app_name]['title']+"is ranked: "+ app);

    } catch (error) {
        console.log("App Not Found"+top_paid_ap_json[app])
    }

});

//<<----- ADDING TOP PAID GAMES ----->>
const top_paid_games = "top_paid_games.json";
const top_paid_games_file = fs.readFileSync(top_paid_games);
const top_paid_games_json = JSON.parse(top_paid_games_file);

Object.keys(top_paid_games_json).forEach(function (app){

    let app_name = top_paid_games_json[app]['title']

    try {
        all_apps_json[app_name]['apprank'] = app;
        console.log(all_apps_json[app_name]['title']+"is ranked: "+ app);

    } catch (error) {
        console.log("App Not Found"+top_paid_games_json[app])
    }

});

fs.writeFile('app_metaAndContent_withTopApps.json', JSON.stringify(all_apps_json), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JSON saved");
        console.log("Number of App: "+Object.keys(all_apps_json).length)
    }
});