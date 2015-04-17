(function () {
  'use strict';

  var Dyframe = window.Dyframe;

  // Add custom profile
  Dyframe.addProfile('custom', {
    width: 980,
    deviceWidth: 280
  });

  var input = document.getElementById('input');
  var html = input.value;
  var dyframes = [];

  // Base
  var baseElement = document.getElementById('dyframe-base');
  if (baseElement) {
    dyframes.push(new Dyframe(baseElement, {
      html: html
    }));
  }

  // Width 1200px
  var widthElement = document.getElementById('dyframe-width');
  if (widthElement) {
    dyframes.push(new Dyframe(widthElement, {
      html: html,
      width: 1200
    }));
  }

  // Device width 600px
  var deviceWidthElement = document.getElementById('dyframe-device-width');
  if (deviceWidthElement) {
    dyframes.push(new Dyframe(deviceWidthElement, {
      html: html,
      deviceWidth: 600
    }));
  }

  // Tablet
  var tabletElement = document.getElementById('dyframe-tablet');
  if (tabletElement) {
    dyframes.push(new Dyframe(tabletElement, {
      html: html,
      profile: 'tablet'
    }));
  }

  // Smartphone
  var smartphoneElement = document.getElementById('dyframe-smartphone');
  if (smartphoneElement) {
    dyframes.push(new Dyframe(smartphoneElement, {
      html: html,
      profile: 'smartphone'
    }));
  }

  // Custom profile
  var customProfileElement = document.getElementById('dyframe-custom-profile');
  if (customProfileElement) {
    dyframes.push(new Dyframe(customProfileElement, {
      html: html,
      profile: 'custom'
    }));
  }

  // Re-rendering
  var renderElement = document.getElementById('dyframe-render');
  if (renderElement) {
    var renderDyframe = new Dyframe(renderElement, {
      html: html
    });
    dyframes.push(renderDyframe);
    var renderProfile = null;
    setInterval(function () {
      switch (renderProfile) {
        case null:
          renderProfile = 'tablet';
          break;
        case 'tablet':
          renderProfile = 'smartphone';
          break;
        case 'smartphone':
          renderProfile = null;
          break;
      }
      renderDyframe.render({
        profile: renderProfile
      });
    }, 3000);
  }

  // Sync HTML content with textarea value
  var updateHtml = function () {
    dyframes.forEach(function (dyframe) {
      dyframe.render({
        html: input.value
      });
    });
  };
  var timer;
  input.addEventListener('change', function () {
    updateHtml();
  });
  input.addEventListener('keyup', function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      updateHtml();
    }, 500);
  });

}).call(this);
