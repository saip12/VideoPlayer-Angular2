const express = require('express');
const bodyParser = require('body-parser'); //Middleware to hold the form data

const path = require('path');

const api = require('./server/routes/api.js');
const port = 4200;
const app  = express();

app.use(express.static(path.join(__dirname,'dist')));


app.use(bodyParser.urlencoded({extended: true}));  //   parses the text as url encoded data
app.use(bodyParser.json());  // parses text as json

app.use('/api',api);

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port, function () {
  console.log("server running on localhost:" + port);
});
