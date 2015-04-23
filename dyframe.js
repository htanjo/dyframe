/*!
 * Dyframe
 * @version 0.3.0
 * @link https://github.com/htanjo/dyframe
 * @author Tanjo, Hiroyuki
 * @license MIT
 */
(function (window, document, undefined) {
  'use strict';

  // Device profiles
  var profiles = {
    // iPhone 6 portrait
    smartphone: {
      width: 980,
      deviceWidth: 375
    },
    // iPad Air 2 portrait
    tablet: {
      width: 980,
      deviceWidth: 768
    }
  };

  // Prefix for class names
  var prefix = 'df-';

  // Default options
  var defaults = {
    html: '',
    width: 980,
    deviceWidth: null,
    profile: null
  };

  // Constructor
  var Dyframe = function (element, options) {
    this.element = element;
    this.wrapper = document.createElement('div');
    this.viewport = document.createElement('iframe');
    addClass(this.element, prefix + 'element');
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
    this.element.appendChild(this.wrapper);
    this.render(options || {});
    this.initialized = true;
  };

  // Render viewport
  Dyframe.prototype.render = function (options) {
    if (typeof options === 'object') {
      this.updateOptions(options);
    }
    this.updateClass();
    var innerSize = getInnerSize(this.element);
    this.width = innerSize.width;
    this.height = innerSize.height;
    this.wrapper.style.paddingBottom = this.height + 'px';
    this.scale();
    this.viewport.contentWindow.document.open();
    this.viewport.contentWindow.document.write(this.options.html);
    this.viewport.contentWindow.document.close();
  };

  // Init or override options
  Dyframe.prototype.updateOptions = function (options) {
    if (!this.options) {
      this.options = mergeObjects({}, defaults, options);
      return;
    }
    mergeObjects(this.options, options);
  };

  // Check if active profile is given
  Dyframe.prototype.hasActiveProfile = function () {
    return !!(this.options.profile && profiles[this.options.profile]);
  };

  // Update class name of dyframe.element
  Dyframe.prototype.updateClass = function () {
    removePrefixedClass(this.element, prefix + 'profile-');
    if (this.hasActiveProfile()) {
      addClass(this.element, prefix + 'profile-' + this.options.profile);
    }
  };

  // Scale preview accroding to options
  Dyframe.prototype.scale = function () {
    var scale = this.width / this.getViewportWidth();
    setStyles(this.viewport, {
      width: (100 / scale) + '%',
      height: (100 / scale) + '%',
      webkitTransform: 'scale(' + scale + ')',
      msTransform: 'scale(' + scale + ')',
      transform: 'scale(' + scale + ')'
    });
  };

  // Get width of rendering HTML
  Dyframe.prototype.getViewportWidth = function () {
    var config = this.hasActiveProfile() ? profiles[this.options.profile] : {
      width: this.options.width,
      deviceWidth: this.options.deviceWidth
    };
    if (!config.deviceWidth) {
      return config.width;
    }
    var viewportData = this.getViewportData();
    var width = viewportData.width;
    var initialScale = viewportData['initial-scale'];
    if (width) {
      if (width === 'device-width') {
        return config.deviceWidth;
      }
      return parseInt(width, 10);
    }
    if (initialScale && initialScale > 0) {
      return Math.floor(config.deviceWidth / parseFloat(initialScale));
    }
    return config.width;
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

  // Clean up element and remove classes
  Dyframe.prototype.destroy = function () {
    if (!this.initialized) {
      return;
    }
    removeClass(this.element, 'df-element');
    removePrefixedClass(this.element, 'df-profile-');
    this.element.removeChild(this.wrapper);
    this.initialized = false;
  };

  // Add custom profile
  Dyframe.addProfile = function (name, profileData) {
    var profileDefaults = {
      width: defaults.width,
      deviceWidth: defaults.deviceWidth
    };
    var profile = mergeObjects({}, profileDefaults, profileData);
    profiles[name] = profile;
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

  // Utility for adding class
  var addClass = function (element, className) {
    if (element.classList) {
      element.classList.add(className);
    }
    else {
      element.className += ' ' + className;
    }
  };

  // Utility for removing class
  var removeClass = function (element, className) {
    if (element.classList) {
      element.classList.remove(className);
    }
    else {
      var pattern = new RegExp('(^|\\s)' + className + '(?!\\S)', 'g');
      element.className = element.className.replace(pattern, '');
    }
  };

  // Utility for removing prefixed classes (e.g. "df-profile-*")
  var removePrefixedClass = function (element, classPrefix) {
    var pattern = new RegExp('(^|\\s)' + classPrefix + '\\S+', 'g');
    element.className = element.className.replace(pattern, '');
  };

  // Get inner width/height of element
  var getInnerSize = function (element) {
    var style = window.getComputedStyle(element);
    var paddingTop = parseInt(style.getPropertyValue('padding-top'), 0);
    var paddingLeft = parseInt(style.getPropertyValue('padding-left'), 0);
    var paddingRight = parseInt(style.getPropertyValue('padding-right'), 0);
    var paddingBottom = parseInt(style.getPropertyValue('padding-bottom'), 0);
    var innerSize = {
      width: element.clientWidth - (paddingLeft + paddingRight),
      height: element.clientHeight - (paddingTop + paddingBottom)
    };
    return innerSize;
  };

  // Module interface
  if (typeof define === 'function' && define.amd) {
    define('dyframe', [], function () {
      return Dyframe;
    });
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = Dyframe;
  }
  else {
    window.Dyframe = Dyframe;
  }

}(window, document));
