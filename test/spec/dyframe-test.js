(function () {
  'use strict';

  var Dyframe = window.Dyframe;
  var element = document.getElementById('dyframe-fixture');
  var dyframe;

  element.style.width = '100px';
  element.style.height = '200px';

  describe('Dyframe', function () {

    describe('.addProfile()', function () {

      afterEach(function () {
        dyframe.destroy();
      });

      it('adds active profile for dyframe objects', function () {
        Dyframe.addProfile('custom', {});
        dyframe = new Dyframe(element, {
          profile: 'custom'
        });
        assert(dyframe.hasActiveProfile());
      });

    });

    describe('constructor', function () {

      afterEach(function () {
        dyframe.destroy();
      });

      it('creates <div> and <iframe> in the target element', function () {
        dyframe = new Dyframe(element);
        assert.isNotNull(element.querySelector('div'));
        assert.isNotNull(element.querySelector('iframe'));
      });

      it('creates HTML content in <iframe>', function () {
        dyframe = new Dyframe(element, {
          html: '<html><body>Hello, world!</body></html>'
        });
        var iframe = element.querySelector('iframe');
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
        dyframe = new Dyframe(element);
        assert.deepEqual(dyframe.options, defaults);
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
        dyframe = new Dyframe(element, options);
        assert.deepEqual(dyframe.options, expected);
      });

      it('adds "df-element" class to the target element', function () {
        dyframe = new Dyframe(element);
        assert(element.classList.contains('df-element'));
      });

      it('adds "df-profile-<name>" class when profile option given', function () {
        dyframe = new Dyframe(element, {
          profile: 'smartphone'
        });
        assert(element.classList.contains('df-profile-smartphone'));
      });

    });

  });

  describe('dyframe', function () {

    beforeEach(function () {
      dyframe = new Dyframe(element, {
        html: '<html><body>Hello, world!</body></html>'
      });
    });

    afterEach(function () {
      dyframe.destroy();
    });

    describe('.render()', function () {

      var iframe;
      var body;

      beforeEach(function () {
        iframe = element.querySelector('iframe');
      });

      it('overrides options when argument given', function () {
        dyframe.render({
          width: 1200
        });
        assert.equal(dyframe.options.width, 1200);
      });

      // Somehow this is not working on PhantomJS...
      // it('makes <iframe> same size with target element', function () {
      //   var rect = iframe.getBoundingClientRect();
      //   assert.equal(rect.width, 100);
      //   assert.equal(rect.height, 200);
      // });

      it('renders HTML according to default options', function () {
        dyframe.render();
        body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 980);
      });

      it('renders HTML according to width option', function () {
        dyframe.render({
          width: 1200
        });
        body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 1200);
      });

      it('renders HTML accroding to deviceWidth option if HTML has meta-viewport', function () {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 360);
      });

      it('renders HTML accroding to width option if HTML does not have meta-viewport', function () {
        dyframe.render({
          html: '<html><head></head></html>',
          width: 980,
          deviceWidth: 360
        });
        body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 980);
      });

      it('renders HTML accroding to "smartphone" profile', function () {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'smartphone'
        });
        body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 375);
      });

      it('renders HTML accroding to "tablet" profile', function () {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'tablet'
        });
        body = iframe.contentWindow.document.body;
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
        body = iframe.contentWindow.document.body;
        assert.equal(body.clientWidth, 412);
      });

    });

    describe('.destroy()', function () {

      var iframe;

      it('cleans up the target element', function () {
        dyframe.destroy();
        assert.equal(element.innerHTML, '');
      });

      it('removes "df" related classes', function () {
        dyframe.render({
          profile: 'smartphone'
        });
        dyframe.destroy();
        assert.notOk(element.classList.contains('df-element'));
        assert.notOk(element.classList.contains('df-profile-smartphone'));
      });

      it('preserves non-"df" classes', function () {
        element.classList.add('non-df-class');
        dyframe.destroy();
        assert(element.classList.contains('non-df-class'));
      });

    });

  });

}());
