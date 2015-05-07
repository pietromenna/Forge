var fs = require('fs');
var url = require('url');

// Data structure to manage last ten characters when parsing
var arrTen = function () {
  var self = {};

  self.arr = [];

  self.add = function (el) {
    var arrLength = self.arr.length;

    if (arrLength < 10) {
      self.arr.push(el);
    }
    else if (arrLength === 10) {
      self.arr.shift();
      self.arr.push(el);
    }
  };

  self.toString = function () {
    return self.arr.join('');
  };

  return self;
};

exports.processPageHTML = function (pageHTML, baseUrl) {
  var baseUrl = 'http://www.landsend.com/products/toddler-snow-flurry-boots/id_261708';

  var topTen = new arrTen();

  var urls = [];

  var urlMode = false;

  // sometimes the URL is enclosed by single quotes
  var quoteType = '"';
  var curUrl = '';

  // find the URLs that need normalizing
  for (var i = 0; i < pageHTML.length; i++) {
    if (urlMode) {
      var curChar = pageHTML[i];

      if (curChar === quoteType) {
        var fullUrl = url.resolve(baseUrl, curUrl);

        urls.push({
          url: fullUrl,
          startPosition: i - curUrl.length,
          endPosition: i - 1
        });

        curUrl = '';
        urlMode = false;
      }
      else {
        curUrl += curChar;
      }
    }
    else {
      topTen.add(pageHTML[i]);

      var curStr = topTen.toString();

      if (
        curStr.indexOf('src="') === 5 ||
        curStr.indexOf('href="') === 4
        )
      {
        urlMode = true;
        quoteType = '"';
      }
      else if (curStr.indexOf("url('") === 5) {
        urlMode = true;
        quoteType = "'";
      }
    }
  }

  var urlReplaceMode = false;
  var curUrlIndex = 0;
  var curUrl = urls[curUrlIndex];

  var newHTML = '';

  if (urls.length > 0) {
    // swap out new URLs for the old ones
    for (var m = 0; m < pageHTML.length; m++) {
      if (m === curUrl.startPosition) {
        newHTML += curUrl.url;
        m = curUrl.endPosition;
        if (urls[curUrlIndex + 1]) {
          curUrlIndex++;
          curUrl = urls[curUrlIndex];
        }
      }
      else {
        newHTML += pageHTML[m];
      }
    }

    return newHTML;
  }
  else {
    return pageHTML;
  }
};
