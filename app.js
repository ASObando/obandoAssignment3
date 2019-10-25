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
    fetch('http://xkcd.com/info.0.json')
        .then(res => res.json())
        .then(json =>{
        year = json.year;
        comicName = json.title;
        image = json.img;
        console.log(json)});
    res.render("index",{year: year, title: comicName, image: image});
});

http.createServer(app).listen(port, function(){

});
