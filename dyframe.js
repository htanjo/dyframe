/**
 * @license Dyframe
 * (c) 2015 Tanjo, Hiroyuki. https://github.com/htanjo/dyframe
 * License: MIT
 */
;(function () {
  'use strict';

  // Device profiles
  var profiles = {
    tablet: 768,
    tabletLandscape: 1024,
    smartphone: 375,
    smartphoneLandscape: 667
  };

  // Default viewport width
  var baseWidth = 980;

  // Default options
  var defaults = {
    src: '',
    width: baseWidth,
    profile: ''
  };

  // Constructor
  var Dyframe = function (element, options) {
    this.options = mergeObjects({}, defaults, options);
    this.wrapper = document.createElement('div');
    this.viewport = document.createElement('iframe');
    this.width = element.clientWidth;
    this.height = element.clientHeight;
    setStyles(this.wrapper, {
      position: 'relative',
      display: 'block',
      height: 0,
      padding: 0,
      overflow: 'hidden'
    });
    setStyles(this.viewport, {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      border: 0,
      webkitTransformOrigin: '0 0',
      msTransformOrigin: '0 0',
      transformOrigin: '0 0'
    });
    this.wrapper.appendChild(this.viewport);
    element.appendChild(this.wrapper);
    this.render();
  }

  // Render viewport
  Dyframe.prototype.render = function () {
    this.wrapper.style.paddingBottom = this.height + 'px';
    this.scale();
    this.viewport.contentWindow.document.open();
    this.viewport.contentWindow.document.write(this.options.src);
    this.viewport.contentWindow.document.close();
  };

  // Scale preview accroding to options
  Dyframe.prototype.scale = function () {
    // var profile = profiles[this.options.profile];
    var scale = this.width / this.options.width;
    setStyles(this.viewport, {
      width: (100 / scale) + '%',
      height: (100 / scale) + '%',
      webkitTransform: 'scale(' + scale + ')',
      msTransform: 'scale(' + scale + ')',
      transform: 'scale(' + scale + ')'
    });
  };

  // Utility for merging objects
  var mergeObjects = function () {
    var merged = arguments[0];
    var i;
    var prop;
    for (i = 1; i < arguments.length; i++) {
      for (prop in arguments[i]) {
        if (arguments[i].hasOwnProperty(prop)) {
          merged[prop] = arguments[i][prop];
        }
      }
    }
    return merged;
  };

  // Utility for setting styles
  var setStyles = function (element, styles) {
    var prop;
    for (prop in styles) {
      element.style[prop] = styles[prop];
    }
  };

  // Module interface
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Dyframe;
  }
  else {
    var globalScope = typeof window !== 'undefined' ? window : this;
    globalScope.Dyframe = Dyframe;
  }

}).call(this);
