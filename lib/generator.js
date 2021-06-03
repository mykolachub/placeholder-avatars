'use strict';

const {
  types,
  variants,
  defaultColors,
  defaultBg,
  amount,
  size,
} = require('./default.js');

// for svg generating
class PlaceholderGenerator {
  constructor(options = {}) {
    this.type = options.type || types[0];
    this.size = options.size || size.default;
    this.variant = options.variant || variants[0];
    this.colors = options.colors || defaultColors;
    this.amount = options.amount || amount.default;
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

  generate() {
    return this;
  }

  source() {
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
