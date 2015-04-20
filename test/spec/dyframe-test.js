(function () {
  'use strict';

  var Dyframe = window.Dyframe;
  var element = document.getElementById('dyframe');
  var dyframe;

  element.style.width = '100px';
  element.style.height = '200px';

  describe('Dyframe', function () {

    describe('.addProfile()', function () {

      it('adds active profile for dyframe objects', function () {
        Dyframe.addProfile('custom', {});
        element.innerHTML = '';
        var dyframe = new Dyframe(element, {
          profile: 'custom'
        });
        assert(dyframe.hasActiveProfile());
      });

    });

    describe('constructor', function () {

      beforeEach(function () {
        element.innerHTML = '';
        dyframe = new Dyframe(element, {
          html: '<html><body>Hello, world!</body></html>'
        });
      });

      it('creates <div> and <iframe> in the target element', function () {
        assert.isObject(dyframe.element);
        assert.isNotNull(dyframe.element.querySelector('div'));
        assert.isNotNull(dyframe.element.querySelector('iframe'));
      });

      it('creates HTML content in <iframe>', function () {
        var iframe = dyframe.element.querySelector('iframe');
        var body = iframe.contentWindow.document.body;
        assert.equal(body.innerHTML, 'Hello, world!');
      });

      it('sets default options when no options given', function () {
        var defaults = {
          html: '',
          width: 980,
          deviceWidth: null,
          profile: null
        };
        var dyframeWithoutOptions = new Dyframe(element);
        assert.deepEqual(dyframeWithoutOptions.options, defaults);
      });

      it('overrides default options when options given', function () {
        var options = {
          html: '<html><body>Hello, Dyframe!</body></html>',
          deviceWidth: 360
        };
        var expected = {
          html: '<html><body>Hello, Dyframe!</body></html>',
          width: 980,
          deviceWidth: 360,
          profile: null
        };
        var dyframeWithOptions = new Dyframe(element, options);
        assert.deepEqual(dyframeWithOptions.options, expected);
      });

      it('adds "df-element" class to the target element', function () {
        assert(dyframe.element.classList.contains('df-element'));
      });

      it('adds "df-profile-<name>" class when profile option given', function () {
        var dyframeWithProfile = new Dyframe(element, {
          profile: 'smartphone'
        });
        assert(dyframeWithProfile.element.classList.contains('df-profile-smartphone'));
      });

    });

  });

  describe('dyframe', function () {

    beforeEach(function () {
      element.innerHTML = '';
      dyframe = new Dyframe(element, {
        html: '<html><body>Hello, world!</body></html>'
      });
    });

    describe('.render()', function () {

      var iframe;

      beforeEach(function () {
        dyframe.render();
        iframe = dyframe.element.querySelector('iframe');
      });

      // Somehow this is not working on PhantomJS...
      // it('makes <iframe> same size with target element', function () {
      //   var rect = iframe.getBoundingClientRect();
      //   assert.equal(rect.width, 100);
      //   assert.equal(rect.height, 200);
      // });

      it('renders HTML according to width option', function () {
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 980);
      });

      it('overrides options when options argument given', function () {
        dyframe.render({
          width: 1200
        });
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 1200);
      });

      it('renders HTML accroding to deviceWidth option if HTML has meta-viewport', function () {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 360);
      });

      it('renders HTML accroding to width option if HTML does not have meta-viewport', function () {
        dyframe.render({
          html: '<html><head></head></html>',
          width: 980,
          deviceWidth: 360
        });
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 980);
      });

      it('renders HTML accroding to "smartphone" profile', function () {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'smartphone'
        });
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 375);
      });

      it('renders HTML accroding to "tablet" profile', function () {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'tablet'
        });
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 768);
      });

      it('renders HTML accroding to custom profile', function () {
        Dyframe.addProfile('nexus-6', {
          width: 980,
          deviceWidth: 412
        });
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'nexus-6'
        });
        var body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 412);
      });

    });

  });

}());
