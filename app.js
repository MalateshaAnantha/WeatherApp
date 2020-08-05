const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {


  res.sendfile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  //console.log("post Received");

  var city = req.body.cityName;
  const apikey = 'ac09451f45fd097e7e21fbf48ed1784c';
  const unit = 'metric';
  const query = city;
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apikey + '&units=' + unit;

  //console.log(city);

  https.get(url, function(response) {


    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);

      const temp = weatherdata.main.temp;
      console.log(temp);

      const weatherDescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      console.log(weatherDescription);

      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(imgURL);
      res.write("<h1>Temperature In "+ query+" is " + temp + " degree Celcius. </h1>");
      res.write("<h3> Weather Description : " + weatherDescription + " . </h3>");
      res.write('<img src="' + imgURL + '" alt="Italian Trulli">')



      res.send();
    })
  })




})


app.listen(3000, function() {
  console.log("listening on port 3000");
});

/*  */
