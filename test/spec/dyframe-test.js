/* jshint mocha: true, expr: true */
/* global expect */
(function () {
  'use strict';

  var Dyframe = window.Dyframe;
  var element = document.createElement('div');
  var dyframe;

  // Helpers
  var hasClass = function (element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    }
    else {
      return new RegExp('(^|\\s)' + className + '(?!\\S)', 'g').test(element.className);
    }
  };
  var addClass = function (element, className) {
    if (element.classList) {
      element.classList.add(className);
    }
    else {
      element.className += ' ' + className;
    }
  };

  // Set up fixtures
  element.style.width = '100px';
  element.style.height = '200px';
  document.body.appendChild(element);

  // Specs
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
        expect(dyframe.hasActiveProfile()).to.be.true;
      });

    });

    describe('Constructor', function () {

      afterEach(function () {
        dyframe.destroy();
      });

      it('creates <div> and <iframe> in the target element', function () {
        dyframe = new Dyframe(element);
        expect(element.querySelector('div')).not.to.be.null;
        expect(element.querySelector('iframe')).not.to.be.null;
      });

      it('creates HTML content in <iframe>', function () {
        dyframe = new Dyframe(element, {
          html: '<html><body>Hello, world!</body></html>'
        });
        var iframe = element.querySelector('iframe');
        var body = iframe.contentWindow.document.body;
        expect(body.innerHTML).to.equal('Hello, world!');
      });

      it('sets default options when no options given', function () {
        var defaults = {
          html: '',
          width: 980,
          deviceWidth: null,
          profile: null,
          interval: 0
        };
        dyframe = new Dyframe(element);
        expect(dyframe.options).to.deep.equal(defaults);
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
          profile: null,
          interval: 0
        };
        dyframe = new Dyframe(element, options);
        expect(dyframe.options).to.deep.equal(expected);
      });

      it('adds "df-element" class to the target element', function () {
        dyframe = new Dyframe(element);
        expect(hasClass(element, 'df-element')).to.be.true;
      });

      it('adds "df-profile-<name>" class when profile option given', function () {
        dyframe = new Dyframe(element, {
          profile: 'smartphone'
        });
        expect(hasClass(element, 'df-profile-smartphone')).to.be.true;
      });

    });

  });

  describe('dyframe', function () {

    describe('.render()', function () {

      var iframe;
      var body;

      beforeEach(function () {
        dyframe = new Dyframe(element, {
          html: '<html><body>Hello, world!</body></html>'
        });
        iframe = element.querySelector('iframe');
      });

      afterEach(function () {
        dyframe.destroy();
      });

      it('overrides options when argument given', function () {
        dyframe.render({
          width: 1200
        });
        expect(dyframe.options.width).to.equal(1200);
      });

      // Somehow this is not working on PhantomJS...
      // it('makes <iframe> same size with target element', function () {
      //   dyframe.render();
      //   var rect = iframe.getBoundingClientRect();
      //   expect(rect.width).to.equal(100);
      //   expect(rect.height).to.equal(200);
      // });

      it('renders HTML according to default options', function (done) {
        dyframe.render();
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(980);
          done();
        }, 0);
      });

      it('renders HTML according to width option', function (done) {
        dyframe.render({
          width: 1200
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(1200);
          done();
        }, 0);
      });

      it('renders HTML accroding to deviceWidth option if HTML has meta-viewport', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(360);
          done();
        }, 0);
      });

      it('renders HTML accroding to width option if HTML does not have meta-viewport', function (done) {
        dyframe.render({
          html: '<html><head></head></html>',
          width: 980,
          deviceWidth: 360
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(980);
          done();
        }, 0);
      });

      it('renders HTML accroding to width value in meta-viewport', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=720"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(720);
          done();
        }, 0);
      });

      it('renders HTML accroding to initial-scale value in meta-viewport', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="initial-scale=0.5"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(720);
          done();
        }, 0);
      });

      it('renders HTML ignoring meta-viewport that does not have content', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(980);
          done();
        }, 0);
      });

      it('renders HTML ignoring meta-viewport that has invalid content', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width:device-width"></head></html>',
          width: 980,
          deviceWidth: 360
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(980);
          done();
        }, 0);
      });

      it('renders HTML accroding to "smartphone" profile', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'smartphone'
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(375);
          done();
        }, 0);
      });

      it('renders HTML accroding to "tablet" profile', function (done) {
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'tablet'
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(768);
          done();
        }, 0);
      });

      it('renders HTML accroding to custom profile', function (done) {
        Dyframe.addProfile('nexus-6', {
          width: 980,
          deviceWidth: 412
        });
        dyframe.render({
          html: '<html><head><meta name="viewport" content="width=device-width"></head></html>',
          profile: 'nexus-6'
        });
        setTimeout(function () {
          expect(iframe.contentWindow.innerWidth).to.equal(412);
          done();
        }, 0);
      });

      it('skips and postpones rendering when interval option given', function (done) {
        dyframe.render({
          html: '<html><body>First rendering</body></html>',
          interval: 1000
        });
        setTimeout(function () {
          body = iframe.contentWindow.document.body;
          expect(body.innerHTML).to.equal('First rendering');
          dyframe.render({
            html: '<html><body>Second rendering</body></html>'
          });
          setTimeout(function () {
            body = iframe.contentWindow.document.body;
            expect(body.innerHTML).to.equal('First rendering');
            setTimeout(function () {
              body = iframe.contentWindow.document.body;
              expect(body.innerHTML).to.equal('Second rendering');
              done();
            }, 1000);
          }, 0);
        }, 0);
      });

    });

    describe('.destroy()', function () {

      beforeEach(function () {
        dyframe = new Dyframe(element, {
          html: '<html><body>Hello, world!</body></html>'
        });
      });

      it('cleans up the target element', function () {
        dyframe.destroy();
        expect(element.innerHTML).to.be.empty;
      });

      it('removes "df" related classes', function () {
        dyframe.render({
          profile: 'smartphone'
        });
        dyframe.destroy();
        expect(hasClass(element, 'df-element')).to.be.false;
        expect(hasClass(element, 'df-profile-smartphone')).to.be.false;
      });

      it('preserves non-"df" classes', function () {
        addClass(element, 'non-df-class');
        dyframe.destroy();
        expect(hasClass(element, 'df-element')).to.be.false;
        expect(hasClass(element, 'non-df-class')).to.be.true;
      });

      it('can be called twice, but does nothing', function () {
        dyframe.destroy();
        expect(element.innerHTML).to.be.empty;
        expect(function () {dyframe.destroy();}).to.not.throw(Error);
        expect(element.innerHTML).to.be.empty;
      });

    });

  });

}());
