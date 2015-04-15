(function () {
  'use strict';

  var Dyframe = window.Dyframe;
  var element = document.getElementById('dyframe');
  var html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>Demo</h1><p>Hello, world!</p></body></html>';
  var dyframe = new Dyframe(element, {
    html: html,
    profile: 'smartphone'
  });
  setTimeout(function () {
    dyframe.render({
      html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>Demo</h1><p>Updated!</p></body></html>'
    });
  }, 1000);

}).call(this);
