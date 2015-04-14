var express = require('express');
var app = express();
var fs = require('fs');

app.get('/testjson', function (req, res) {
  var htmlparser = require("htmlparser2");

  var handler = new htmlparser.DomHandler(function (error, dom) {
      if (error)
          console.log('error: ' + error);
      else {

      }
  });
  var parser = new htmlparser.Parser(handler);
  parser.write(fs.readFileSync('test.html'));
  parser.done();
});

app.get('/testhtml', function(req, res) {
  res.send(fs.readFileSync('test.html'));
});

app.use(express.static('public'));
app.use(express.static('build'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
