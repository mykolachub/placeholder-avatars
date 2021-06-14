'use strict';

class FactorySvg {
  constructor(size, type, element) {
    this.size = size;
    this.type = type;
    this.element = element;
  }

  createSvgTags() {
    const width = `width="${this.size}"`;
    const height = `height="${this.size}"`;
    const viewBox = `viewBox="0 0 ${this.size} ${this.size}"`;
    const fill = `fill="none"`;
    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    const tags = {
      start: ['<svg', width, height, viewBox, fill, xmlns, '>'].join(' '),
      end: '</svg>',
    };
    return tags;
  }

  createBlock(x, y, size, bgColor) {
    if (this.element === 'square') {
      return this.createRec(x, y, size, bgColor);
    }
    return this.createCircle(x, y, size, bgColor);
  }

  createBackground(bgColor) {
    if (this.type === 'square') {
      return this.createBackgroundRec(bgColor);
    }
    return this.createBackgroundCicle(bgColor);
  }

  createBackgroundRec(bgColor) {
    return this.createRec(0, 0, this.size, bgColor);
  }

  createBackgroundCicle(bgColor) {
    const halfSized = this.size / 2;
    return this.createCircle(halfSized, halfSized, halfSized, bgColor);
  }

  createRec(xCord, yCord, size, bgColor) {
    const x = `x="${xCord}"`;
    const y = `y="${yCord}"`;
    const width = `width="${size}"`;
    const height = `height="${size}"`;
    const fill = `fill="${bgColor}"`;
    return ['<rect', x, y, width, height, fill, '/>'].join(' ');
  }

  createCircle(xCord, yCord, size, bgColor) {
    const cx = `cx="${xCord}"`;
    const cy = `cy="${yCord}"`;
    const r = `r="${size / 2}"`;
    const fill = `fill="${bgColor}"`;
    return ['<circle', cx, cy, r, fill, '/>'].join(' ');
  }
}

module.exports = FactorySvg;
