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
    html: '',
    width: baseWidth,
    profile: ''
  };

  // Constructor
  var Dyframe = function (element, options) {
    this.element = element;
    this.wrapper = document.createElement('div');
    this.viewport = document.createElement('iframe');
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
    this.render(options);
  };

  // Render viewport
  Dyframe.prototype.render = function (options) {
    if (typeof options === 'object') {
      this.updateOptions(options);
    }
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.wrapper.style.paddingBottom = this.height + 'px';
    this.scale();
    this.viewport.contentWindow.document.open();
    this.viewport.contentWindow.document.write(this.options.html);
    this.viewport.contentWindow.document.close();
  };

  // Override options
  Dyframe.prototype.updateOptions = function (options) {
    if (!this.options) {
      this.options = mergeObjects({}, defaults, options);
    }
    else {
      mergeObjects(this.options, options);
    }
  };

  // Scale preview accroding to options
  Dyframe.prototype.scale = function () {
    var scale = this.width / this.getPreviewWidth();
    setStyles(this.viewport, {
      width: (100 / scale) + '%',
      height: (100 / scale) + '%',
      webkitTransform: 'scale(' + scale + ')',
      msTransform: 'scale(' + scale + ')',
      transform: 'scale(' + scale + ')'
    });
  };

  // Get preview HTML width
  Dyframe.prototype.getPreviewWidth = function () {
    if (!this.options.profile || !profiles[this.options.profile]) {
      return this.options.width;
    }
    var viewportData = this.getViewportData();
    var width = viewportData.width;
    if (!width) {
      return baseWidth;
    }
    if (width === 'device-width') {
      return profiles[this.options.profile];
    }
    return parseInt(width, 10);
  };

  // Get viewport content as object
  Dyframe.prototype.getViewportData = function () {
    var el = document.createElement('div');
    var viewportElement;
    var viewportContent;
    var viewportData = {};
    el.innerHTML = this.options.html;
    viewportElement = el.querySelector('meta[name="viewport"]');
    if (!viewportElement) {
      return viewportData;
    }
    viewportContent = viewportElement.getAttribute('content');
    if (!viewportContent) {
      return viewportData;
    }
    viewportContent.split(',').forEach(function (configSet) {
      var config = configSet.trim().split('=');
      if (!config[0] || !config[1]) {
        return;
      }
      viewportData[config[0].trim()] = config[1].trim();
    });
    return viewportData;
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
