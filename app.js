var http = require('http');
var path = require('path');
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded: false}));

var year = "";
var comicName = "";
var image = "";

app.get('/', function(req, res){
    fetchComic(true);
    res.render("index",{year: year, title: comicName, image: image});
});

app.get('/randomComic', function(req, res){
    fetchComic(false);
    res.render("index",{year: year, title: comicName, image: image});
});

function fetchComic(isCurrent){
    var currentComic = 'http://xkcd.com/info.0.json';
    var randComic = 'http://xkcd.com/'+Math.floor((Math.random() * 2220) + 1)+'/info.0.json';
     fetch(isCurrent ? currentComic : randComic)
        .then(res => res.json())
        .then(json =>{
        year = json.year;
        comicName = json.title;
        image = json.img;
       });

}

http.createServer(app).listen(port, function(){

});
