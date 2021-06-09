"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getRandom = function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var types = ['square', 'round'];
var variants = ['grid', 'random'];
var elements = ['square', 'circle'];
var defaultColors = ['#a32c28', '#1c090b', '#384030', '#7b8055', '#bca875'];
var defaultBg = '#a32c28';
var amount = {
  from: 1,
  to: 10,
  "default": 5
};
var density = {
  from: 2,
  to: 10,
  "default": 8
};
var size = {
  from: 32,
  to: 1024,
  "default": 512
};

var Placeholder = /*#__PURE__*/function () {
  function Placeholder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Placeholder);

    this.type = options.type || types[0]; // square

    this.size = options.size || size["default"]; // 512

    this.variant = options.variant || variants[0]; // grid

    this.element = options.elements || elements[0]; // square

    this.colors = options.colors || defaultColors;
    this.amount = options.amount || amount["default"]; // 5

    this.density = options.density || density["default"]; // 8

    this.background = options.background || defaultBg;
    this.check();
  }

  _createClass(Placeholder, [{
    key: "check",
    value: function check() {
      // type
      if (!types.includes(this.type)) {
        throw new Error('No such type');
      } // variant


      if (!variants.includes(this.variant)) {
        throw new Error('No such variant');
      } // elements


      if (!elements.includes(this.element)) {
        throw new Error('No such element');
      } // amount


      if (this.amount < amount.from || this.amount > amount.to) {
        throw new Error('Available amount from 1 to 10');
      } // density


      if (this.density < density.from || this.density > density.to) {
        throw new Error('Available density from 2 to 10');
      } // size


      if (this.size < size.from || this.size > size.to) {
        throw new Error('Available size from 100x100 to 1000x1000');
      } // отдельно проверка на валидность цветов background, colors


      return this;
    }
  }, {
    key: "createSvgTemplate",
    value: function createSvgTemplate() {
      var width = "width=\"".concat(this.size, "\"");
      var height = "height=\"".concat(this.size, "\"");
      var viewBox = "viewBox=\"0 0 ".concat(this.size, " ").concat(this.size, "\"");
      var fill = "fill=\"none\"";
      var xmlns = 'xmlns="http://www.w3.org/2000/svg"';
      return ['<svg', width, height, viewBox, fill, xmlns, '>'].join(' ');
    }
  }, {
    key: "createBlockTemplate",
    value: function createBlockTemplate(x, y, size, bgColor) {
      if (this.element === 'square') {
        return this.createRecTemplate(x, y, size, bgColor);
      } // circle


      return this.createCircleTemplate(x, y, size, bgColor);
    }
  }, {
    key: "createRecTemplate",
    value: function createRecTemplate(xCord, yCord, size, bgColor) {
      var x = "x=\"".concat(xCord, "\"");
      var y = "y=\"".concat(yCord, "\"");
      var width = "width=\"".concat(size, "\"");
      var height = "height=\"".concat(size, "\"");
      var radius = "rx=\"".concat(this.blockRadius, "\"");
      var fill = "fill=\"".concat(bgColor, "\"");
      return ['<rect', x, y, width, height, radius, fill, '/>'].join(' ');
    }
  }, {
    key: "createCircleTemplate",
    value: function createCircleTemplate(xCord, yCord, size, bgColor) {
      var cx = "cx=\"".concat(xCord, "\"");
      var cy = "cy=\"".concat(yCord, "\"");
      var r = "r=\"".concat(size / 2, "\"");
      var fill = "fill=\"".concat(bgColor, "\"");
      return ['<circle', cx, cy, r, fill, '/>'].join(' ');
    }
  }, {
    key: "createBackground",
    value: function createBackground() {
      var colorId = getRandom(0, this.colors.length);
      var bgColor = this.colors[colorId];

      if (this.type === 'square') {
        return this.createBackgroundRec(bgColor);
      } // circle


      return this.createBackgroundCicle(bgColor);
    }
  }, {
    key: "createBackgroundRec",
    value: function createBackgroundRec(bgColor) {
      return this.createRecTemplate(0, 0, this.size, bgColor);
    }
  }, {
    key: "createBackgroundCicle",
    value: function createBackgroundCicle(bgColor) {
      var halfSized = this.size / 2;
      return this.createCircleTemplate(halfSized, halfSized, halfSized, bgColor);
    }
    /**
     *
     *
     * --var-----type---elements---bg----
     *
     *  grid:  [square, square]
     *         [square, circle, bgSquare]
     *         [circle, square]
     *         [circle, circle, bgCircle]
     *
     * random: [square, square, bgSquare]
     *         [square, circle, bgSquare]
     *         [circle, square, bgCircle]
     *         [circle, circle, bgCircle]
     *
     */

  }, {
    key: "generate",
    value: function generate() {
      var variant = this.variant,
          element = this.element,
          colors = this.colors,
          amount = this.amount,
          density = this.density;
      var start = this.createSvgTemplate();
      var body = [];
      var end = '</svg>';

      if (variant === 'grid') {
        var bg = element === 'circle' ? this.createBackground() : '';
        body.push(bg);

        for (var i = 0; i < density; i += 1) {
          for (var j = 0; j < density; j += 1) {
            var _size = this.size / density;

            var x = element === 'circle' ? _size / 2 + i * _size : i * _size;
            var y = element === 'circle' ? _size / 2 + j * _size : j * _size;
            var colorId = getRandom(0, colors.length);
            var bgColor = colors[colorId];
            var rec = this.createBlockTemplate(x, y, _size, bgColor);
            body.push(rec);
          }
        }
      }

      if (variant === 'random') {
        var _bg = this.createBackground();

        body.push(_bg);

        for (var _i = 0; _i < amount; _i++) {
          var _x = getRandom(0, this.size / 1.25);

          var _y = getRandom(0, this.size / 1.25);

          var _size2 = getRandom(0, this.size / 2);

          var _colorId = getRandom(0, this.colors.length);

          var _bgColor = this.colors[_colorId];

          var _rec = this.createBlockTemplate(_x, _y, _size2, _bgColor);

          body.push(_rec);
        }
      }

      return [start, body, end].flat(1).join('').trim();
    }
  }]);

  return Placeholder;
}();