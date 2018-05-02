const store = require('app-store-scraper');
const fs = require('fs');

let top_app = {};

store.list({
    collection: store.collection.TOP_PAID_GAMES_IOS, //TOP_FREE_IOS for app, TOP_FREE_GAMES_IOS for free games, TOP_PAID_IOS for top paid app, TOP_PAID_GAMES_IOS for top paid games
    num: 200,
    markets: 'US'
  })
  .then(response => {

    top_app_list = [];

    response.forEach(element => {
        top_app_list.push(element)
    });

    for(var i=0; i<top_app_list.length; i++){
        top_app[i+1] = {};
        top_app[i+1]['title'] = top_app_list[i]['title'];
        top_app[i+1]['id'] = top_app_list[i]['id'];
    }
    
    //top_free_app.json
    //top_free_games.json
    //top_paid_app.json
    //top_paid_games.json
    fs.writeFile('top_paid_games.json', JSON.stringify(top_app), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved");
            console.log("Number of App: "+Object.keys(top_app).length)
        }
    });

  })
  .catch(console.log)