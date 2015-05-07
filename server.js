var express = require('express');
var app = express();
var fs = require('fs');
var Nightmare = require('nightmare');
var sha1 = require('sha-1');

var htmlUtils = require('./htmlUtils');

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
  new Nightmare()
  .goto('http://www.landsend.com/products/toddler-snow-flurry-boots/id_261708')
  .evaluate(function () {
    return document.body.parentNode.outerHTML;
  }, function (result) {
    var straightHTML = result;

    fs.writeFile('landsendtext.html', straightHTML, function (err) {
      console.log(err);
    });

    res.send(fs.readFileSync('test.html'));

  })
  .run();
});

app.get('/get-page', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  var url = req.query.url;

  new Nightmare()
  .goto(url)
  .evaluate(function () {
    return document.body.parentNode.outerHTML;
  }, function (result) {
    var html = htmlUtils.processPageHTML(result, url);

    var fileNameHash = sha1(url);

    var newFileName = 'tmp/' + fileNameHash + '.html';

    fs.writeFile(newFileName, html, function (err) {
      res.send(html);
    });
  })
  .run();
});

app.use(express.static('public'));
app.use(express.static('build'));
app.use(express.static('tmp'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
