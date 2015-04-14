;(function () {
  'use strict';

  function Dyframe () {
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Dyframe;
  }
  else {
    var globalScope = typeof window !== 'undefined' ? window : this;
    globalScope.Dyframe = Dyframe;
  }

}).call(this);
