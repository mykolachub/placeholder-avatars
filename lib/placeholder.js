'use strict';

const { utils } = require('./assets/utils.js');
const FactorySvg = require('./assets/svg.js');
const palette = require('nice-color-palettes');

const {
  types,
  variants,
  defaultColors,
  defaultBg,
  amount,
  size,
  elements,
  density,
} = require('./assets/default.js');

/** Class representing a generator of svg-based images placeholders */
class Placeholder {
  /**
   * @param {(string|string[])} classes Classnames of HTML tags:
   * - `null` - default 'placeholder' classname
   * - `string` - classname
   * - `string[]` - array of classnames
   * @param {Object} options Options for the svg to be generated
   * @param {string} options.type Type of the svg shape
   * - `square` - squared shape, by default
   * - `circle` - round shape
   * @param {number} options.size Size of the svg in pixels
   * - range from `32` to `1024`
   * - `512` by default
   * @param {string} options.variant Pattern variant
   * - `grid` - by default
   * - `random` - elements are random placed
   * @param {string} options.elements Shape of pattern elements
   * - `square` - squared elements, by default
   * - `circle` - round elements
   * @param {(string|string[])} options.colors Color palette
   * - `random` - random color palette
   * - `['#..', '#..', ..]` - array of custom colors
   * @param {number} options.amount Amount of random elements
   * - range from `1` to `10`
   * - `5` by default
   * @param {number} options.density Grid density
   * - range from `2` to `10`
   * - `8` by default
   * @param {string} options.background Background of the svg
   * - `string` - background color
   */
  constructor(classes, options = {}) {
    this.classes = classes || ['placeholder']; // null || 'a' || ['a', 'b', 'c']
    this.type = options.type || types[0]; // square
    this.size = options.size || size.default; // 512
    this.variant = options.variant || variants[0]; // grid
    this.element = options.elements || elements[0]; // square
    this.colors = options.colors || defaultColors; // random
    this.amount = options.amount || amount.default; // 5
    this.density = options.density || density.default; // 8
    this.background = options.background || defaultBg;
    this.check();
  }

  /**
   * @private
   * @returns this
   */
  check() {
    // className
    if (
      typeof this.classes !== 'string' &&
      !Array.isArray(this.classes) &&
      this.classes !== null
    ) {
      throw new Error('Invalid class name');
    }
    if (typeof this.classes === 'string') {
      this.classes = [this.classes];
    }
    // type
    if (!types.includes(this.type)) {
      throw new Error('No such type');
    }
    // variant
    if (!variants.includes(this.variant)) {
      throw new Error('No such variant');
    }
    // elements
    if (!elements.includes(this.element)) {
      throw new Error('No such element');
    }
    // amount
    if (this.amount < amount.from || this.amount > amount.to) {
      throw new Error('Available amount from 1 to 10');
    }
    // density
    if (this.density < density.from || this.density > density.to) {
      throw new Error('Available density from 2 to 10');
    }
    // size
    if (this.size < size.from || this.size > size.to) {
      throw new Error('Available size from 100x100 to 1000x1000');
    }
    // отдельно проверка на валидность цветов background, colors
    return this;
  }

  /**
   * Generates random color palette
   * @private
   * @returns {string[]} arrays of colors
   */
  randomColors() {
    const { length } = palette;
    const paletteId = utils.getRandom(0, length);
    this.colors = palette[paletteId];
    return this.colors;
  }
  /**
   * Generates random backgroud color from palette
   * @private
   * @returns {string} background color
   */
  randomBg() {
    const { colors } = this;
    const colorId = utils.getRandom(0, colors.length);
    const bgColor = colors[colorId];
    return bgColor;
  }

  /**
   * Generates a single svg-based image
   * @returns {string} Generated svg
   */
  generateOne() {
    const { type, size, variant, element, amount, density, colors } = this;

    const factory = new FactorySvg(size, type, element);
    const body = [];

    // colors
    if (colors === 'random') this.colors = this.randomColors();

    const bgColor = this.randomBg();
    const bg = factory.createBackground(bgColor);
    body.push(bg);

    // pattern generation
    if (variant === 'grid') {
      for (let i = 0; i < density; i += 1) {
        for (let j = 0; j < density; j += 1) {
          const size = this.size / density;
          const x = element === 'circle' ? size / 2 + i * size : i * size;
          const y = element === 'circle' ? size / 2 + j * size : j * size;
          const bgColor = this.randomBg();
          const rec = factory.createBlock(x, y, size, bgColor);
          body.push(rec);
        }
      }
    }
    if (variant === 'random') {
      for (let i = 0; i < amount; i++) {
        const x = utils.getRandom(0, this.size / 1.25);
        const y = utils.getRandom(0, this.size / 1.25);
        const size = utils.getRandom(0, this.size / 2);
        const bgColor = this.randomBg();
        const rec = factory.createBlock(x, y, size, bgColor);
        body.push(rec);
      }
    }

    const res = factory.createSvg(body);
    return res;
  }

  /**
   * Generates svg for every HTML element with classname set in `classes`
   * @returns reference to Placeholder
   */
  generate() {
    for (const className of this.classes) {
      const nodeElements = document.querySelectorAll(`.${className}`);
      for (const key in nodeElements) {
        if (Object.hasOwnProperty.call(nodeElements, key)) {
          const element = nodeElements[key];
          element.innerHTML = this.generateOne();
        }
      }
    }
    return this;
  }
}

module.exports = Placeholder;
