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

class Placeholder {
  constructor(options = {}) {
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

  randomColors() {
    const { length } = palette;
    const paletteId = utils.getRandom(0, length);
    this.colors = palette[paletteId];
    return this.colors;
  }

  randomBg() {
    const { colors } = this;
    const colorId = utils.getRandom(0, colors.length);
    const bgColor = colors[colorId];
    return bgColor;
  }

  generate() {
    const { type, size, variant, element, amount, density, colors } = this;

    const factory = new FactorySvg(size, type, element);
    const body = [];

    if (colors === 'random') this.colors = this.randomColors();

    const bgColor = this.randomBg();
    const bg = factory.createBackground(bgColor);
    body.push(bg);

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
}

module.exports = Placeholder;
