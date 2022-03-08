// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//  empty date parameter
app.get("/api", (req, res)=>{
  let date = new Date();
  let UTC = date.getTime()+20000;
  UTC = new Date(UTC);
  UTS = UTC.toUTCString();
  let UNIX = date.getTime()+20000;
  res.json({ unix: UNIX, utc: UTS });
})

app.get("/api/:date", function (req, res) {

    const date = /\d{5,}/.test(req.params.date)? parseInt(req.params.date): req.params.date;
  const dateObj = new Date(date);
  
   if(dateObj.toString() !== 'Invalid Date'){
  res.json({"unix":dateObj.getTime(), "utc": 
  dateObj.toUTCString()});}
   else {
      res.json({"error":"Invalid Date"})

   }
  
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
