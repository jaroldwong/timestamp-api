var express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/:date', function (req, res) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  
  var d = new Date(req.params.date);
  var timestamp = {};
  var naturalDate = "";
  var unixTime = 0;

  if (d.getTime()) {
    unixTime = d.getTime() / 1000;
  } else if (parseInt(req.params.date)) {
    d = new Date(parseInt(req.params.date) * 1000);
    unixTime = d.getTime() / 1000;
  } else {
    timestamp.unix = null;
    timestamp.natural = null;
    res.send(JSON.stringify(timestamp));
  }
  
  timestamp.unix = unixTime;
  
  naturalDate = monthNames[d.getMonth()] + " " +  d.getDate() + ", " + d.getFullYear();
  timestamp.natural = naturalDate;
  
  res.send(JSON.stringify(timestamp));
})

app.listen(process.env.PORT, function () {
  console.log('Server started')
})