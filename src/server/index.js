const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

var aylien = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})
app.get('/test', function(req, res) {
    textapi.sentiment({
        'text': 'John is a very good football player!' //Will update to client input later
    }, function (error,response) {
        if (error === null) {
            console.log(response)
            res.send(response)
        }
    })
})