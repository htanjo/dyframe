(function () {
  'use strict';

  describe('Dyframe', function () {

    var Dyframe = window.Dyframe;
    var element;
    var dyframe;

    beforeEach(function () {
      element = document.getElementById('dyframe');
      dyframe = new Dyframe(element);
    });

    describe('constructor', function () {

      it('creates <div> and <iframe> in the target element', function () {
        assert.isObject(dyframe.element);
        assert.isNotNull(dyframe.element.querySelector('div'));
        assert.isNotNull(dyframe.element.querySelector('iframe'));
      });

      it('add "df-element" class to the target element', function () {
        assert(dyframe.element.classList.contains('df-element'));
      });

    });

  });

}());
