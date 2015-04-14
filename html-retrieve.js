var page = require('webpage').create();
page.viewportSize = { width: 1200, height: 800 };
page.open('http://www.landsend.com/products/toddler-snow-flurry-boots/id_261708', function() {
  var content = page.content;
  console.log(content);
  phantom.exit();
});
