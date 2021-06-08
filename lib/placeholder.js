import { utils } from './assets/utils.js';

import {
  types,
  variants,
  defaultColors,
  defaultBg,
  amount,
  size,
  elements,
  density,
} from './assets/default.js';

// for svg generating
export default class Placeholder {
  constructor(options = {}) {
    this.type = options.type || types[0]; // square
    this.size = options.size || size.default; // 512
    this.variant = options.variant || variants[0]; // grid
    this.element = options.elements || elements[0]; // square
    this.colors = options.colors || defaultColors;
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

  createSvgTemplate() {
    const width = `width="${this.size}"`;
    const height = `height="${this.size}"`;
    const viewBox = `viewBox="0 0 ${this.size} ${this.size}"`;
    const fill = `fill="none"`;
    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    return ['<svg', width, height, viewBox, fill, xmlns, '>'].join(' ');
  }

  createBlockTemplate(x, y, size, bgColor) {
    if (this.element === 'square') {
      return this.createRecTemplate(x, y, size, bgColor);
    }
    // circle
    return this.createCircleTemplate(x, y, size, bgColor);
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

  createCircleTemplate(xCord, yCord, size, bgColor) {
    const cx = `cx="${xCord}"`;
    const cy = `cy="${yCord}"`;
    const r = `r="${size / 2}"`;
    const fill = `fill="${bgColor}"`;
    return ['<circle', cx, cy, r, fill, '/>'].join(' ');
  }

  createBackground() {
    const colorId = utils.getRandom(0, this.colors.length);
    const bgColor = this.colors[colorId];
    if (this.type === 'square') {
      return this.createBackgroundRec(bgColor);
    }
    // circle
    return this.createBackgroundCicle(bgColor);
  }

  createBackgroundRec(bgColor) {
    return this.createRecTemplate(0, 0, this.size, bgColor);
  }

  createBackgroundCicle(bgColor) {
    const halfSized = this.size / 2;
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

  generate() {
    const { variant, element, colors, amount, density } = this;
    const start = this.createSvgTemplate();
    const body = [];
    const end = '</svg>';

    if (variant === 'grid') {
      const bg = element === 'circle' ? this.createBackground() : '';
      body.push(bg);
      for (let i = 0; i < density; i += 1) {
        for (let j = 0; j < density; j += 1) {
          const size = this.size / density;
          const x = element === 'circle' ? size / 2 + i * size : i * size;
          const y = element === 'circle' ? size / 2 + j * size : j * size;
          const colorId = utils.getRandom(0, colors.length);
          const bgColor = colors[colorId];
          const rec = this.createBlockTemplate(x, y, size, bgColor);
          body.push(rec);
        }
      }
    }
    if (variant === 'random') {
      const bg = this.createBackground();
      body.push(bg);
      for (let i = 0; i < amount; i++) {
        const x = utils.getRandom(0, this.size / 1.25);
        const y = utils.getRandom(0, this.size / 1.25);
        const size = utils.getRandom(0, this.size / 2);
        const colorId = utils.getRandom(0, this.colors.length);
        const bgColor = this.colors[colorId];
        const rec = this.createBlockTemplate(x, y, size, bgColor);
        body.push(rec);
      }
    }

    return [start, body, end].flat(1).join('').trim();
  }
}
