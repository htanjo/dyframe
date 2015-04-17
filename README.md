# Dyframe
> Dynamically render scaled HTML into iframe.

[![Bower Version][bower-image]][bower-url]
[![npm Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

[![Dyframe](demo/demo.png)](http://htanjo.github.io/dyframe/)

[**See demo**](http://htanjo.github.io/dyframe/)

## Getting started
### Install

Download and include `dyframe.js` to your HTML.
Available on [Bower](http://bower.io/) and [npm](https://www.npmjs.com/).

* Download: [**dyframe.js**][uncompressed-url] / [minified][minified-url]
* Bower: `$ bower install dyframe --save`
* npm: `$ npm install dyframe --save`

### Example
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Dyframe</title>
    <style>
      #dyframe {
        width: 360px;
        height: 480px;
        border: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <div id="dyframe"></div>
    <script src="dyframe.js"></script>
    <script>
      var element = document.getElementById('dyframe');
      new Dyframe(element, {
        html: '<html><body>Hello, world!</body></html>'
      });
    </script>
  </body>
</html>
```

## Usage
```js
new Dyframe(element, [options]);
```

- `element`: Target DOM element.
- `options`: Options for rendering the HTML content.

## Options
### html
Type: `String`  
Default: `''`

HTML code to render.

### width
Type `Number`  
Default: `980`

Width (pixels) for HTML rendering.  
If you set `profile` option, this value will be ignored. (See below)

### deviceWidth
Type `Number` | `null`  
Default: `null`

Device width (pixels) for HTML rendering.  
If you set number to this, the HTML scaling will be emulated based on `<meta name="viewport">`.  
If you set `profile` option, this value will be ignored. (See below)

### profile
Type: `String` | `null`  
Default: `null`

Profile name for device emulation.  
If you set proper profile, the scaling will be emulated using predefined profile instead of `width` and `deviceWidth` option.

Supported profiles: `'smartphone'`, `'tablet'`

- **smartphone:**  
  width: 980, deviceWidth: 375. Same as iPhone 6 portrait.
- **tablet:**  
  width: 980, deviceWidth: 768. Same as iPad Air 2 portrait.

## API
You can access to programatic API. Example:

```js
var element = document.getElementById('dyframe');

// Create "dyframe" object
var dyframe = new Dyframe(element, {
  html: '<html><body>Hello, world!</body></html>'
});

setTiemout(funciton () {

  // Re-render using new options
  dyframe.render({
    html: '<html><body>Updated!</body></html>'
  });

}, 1000);
```

### .render()
Usage: `.render([options])`

Re-render the preview content.  
If you set options to this method, options will be overriden and re-render.

## Compatibility

### Browser support
- Internet Explorer (9+)
- Chrome
- Firefox
- Safari
- Opera (12 and current)
- iOS Safari
- Android Browser
- Chrome for Android

### Module interface
- CommonJS
- AMD

## License
Copyright (c) 2015 Tanjo, Hiroyuki. Licensed under the [MIT License](LICENSE).

[bower-image]: https://img.shields.io/bower/v/dyframe.svg
[bower-url]: http://bower.io/
[npm-image]: https://img.shields.io/npm/v/dyframe.svg
[npm-url]: https://www.npmjs.com/package/dyframe
[travis-image]: https://img.shields.io/travis/htanjo/dyframe/master.svg
[travis-url]: https://travis-ci.org/htanjo/dyframe
[uncompressed-url]: https://github.com/htanjo/dyframe/raw/v0.2.0/dyframe.js
[minified-url]: https://github.com/htanjo/dyframe/raw/v0.2.0/dyframe.min.js
