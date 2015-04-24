(function () {
  'use strict';

  var Dyframe = window.Dyframe;

  // Add custom profile
  Dyframe.addProfile('pc', {
    width: 1366,
    deviceWidth: null
  });
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
      html: html,
      interval: 500
    }));
  }

  // Width 1200px
  var widthElement = document.getElementById('dyframe-width');
  if (widthElement) {
    dyframes.push(new Dyframe(widthElement, {
      html: html,
      width: 1200,
      interval: 500
    }));
  }

  // Device width 600px
  var deviceWidthElement = document.getElementById('dyframe-device-width');
  if (deviceWidthElement) {
    dyframes.push(new Dyframe(deviceWidthElement, {
      html: html,
      deviceWidth: 600,
      interval: 500
    }));
  }

  // PC
  var pcElement = document.getElementById('dyframe-pc');
  if (pcElement) {
    dyframes.push(new Dyframe(pcElement, {
      html: html,
      profile: 'pc',
      interval: 500
    }));
  }

  // Tablet
  var tabletElement = document.getElementById('dyframe-tablet');
  if (tabletElement) {
    dyframes.push(new Dyframe(tabletElement, {
      html: html,
      profile: 'tablet',
      interval: 500
    }));
  }

  // Smartphone
  var smartphoneElement = document.getElementById('dyframe-smartphone');
  if (smartphoneElement) {
    dyframes.push(new Dyframe(smartphoneElement, {
      html: html,
      profile: 'smartphone',
      interval: 500
    }));
  }

  // Custom profile
  var customProfileElement = document.getElementById('dyframe-custom-profile');
  if (customProfileElement) {
    dyframes.push(new Dyframe(customProfileElement, {
      html: html,
      profile: 'custom',
      interval: 500
    }));
  }

  // Re-rendering
  var renderElement = document.getElementById('dyframe-render');
  if (renderElement) {
    var renderDyframe = new Dyframe(renderElement, {
      html: html,
      interval: 500
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
    html = input.value;
    dyframes.forEach(function (dyframe) {
      dyframe.render({
        html: html
      });
    });
  };
  input.addEventListener('change', function () {
    updateHtml();
  });
  input.addEventListener('keydown', function () {
    setTimeout(function () {
      if (input.value === html) {
        return;
      }
      updateHtml();
    }, 0);
  });

  // Hotfix for image rendering
  setTimeout(function () {
    updateHtml();
  }, 1000);

}).call(this);
