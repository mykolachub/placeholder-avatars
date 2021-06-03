'use strict';

const fs = require('fs');
const { utils } = require('./utils.js');

const {
  types,
  variants,
  defaultColors,
  defaultBg,
  amount,
  size,
  radius,
  elements,
} = require('./default.js');

// for svg generating
class PlaceholderGenerator {
  constructor(options = {}) {
    this.type = options.type || types[0]; // square
    this.size = options.size || size.default; // 512
    this.variant = options.variant || variants[0]; // grid
    this.element = options.elements || elements[0]; // square
    this.colors = options.colors || defaultColors;
    this.amount = options.amount || amount.default; // 5
    this.background = options.background || defaultBg;
    this.blockRadius = options.blockRadius || radius.default; // 0
    this.check();
  }

  check() {
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
    // size
    if (this.size < size.from || this.size > size.to) {
      throw new Error('Available size from 100x100 to 1000x1000');
    }
    // отдельно проверка на валидность цветов background, colors
    return this;
  }

  createSvgTemplate() {
    const width = `width="${this.size}"`;
    const height = `height="${this.size}"`;
    const viewBox = `viewBox="0 0 ${this.size} ${this.size}"`;
    const fill = `fill="none"`;
    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    return ['<svg', width, height, viewBox, fill, xmlns, '>'].join(' ');
  }

  createRecTemplate(xCord, yCord, size, bgColor) {
    const x = `x="${xCord}"`;
    const y = `y="${yCord}"`;
    const width = `width="${size}"`;
    const height = `height="${size}"`;
    const radius = `rx="${this.blockRadius}"`;
    const fill = `fill="${bgColor}"`;
    return ['<rect', x, y, width, height, radius, fill, '/>'].join(' ');
  }

  generate() {
    return this;
  }
}

module.exports = PlaceholderGenerator;

/**
 *
 * PlaceholderGenerator for svg generating
 *
 * Placeholder extends PlaceholderGenerator for html
 *
 */
