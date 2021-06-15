'use strict';

class FactorySvg {
  constructor(size, type, element) {
    this.size = size;
    this.type = type;
    this.element = element;
  }

  createSvg(body) {
    const width = `width="${this.size}"`;
    const height = `height="${this.size}"`;
    const viewBox = `viewBox="0 0 ${this.size} ${this.size}"`;
    const fill = `fill="none"`;
    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    const openTag = ['<svg', width, height, viewBox, fill, xmlns, '>'];
    const maskedBody = this.createMask(body);
    const res = [openTag, maskedBody, '</svg>'].flat(1).join(' ');
    return res;
  }

  createMask(body) {
    const htmlId = 'placeholdermask';
    const id = `id="${htmlId}"`;
    const size = `width="${this.size}" height="${this.size}"`;
    const type = 'mask-type="alpha"';
    const units = 'maskUnits="userSpaceOnUse"';
    const crd = 'x="0" y="0"';
    const rx = this.type === 'circle' ? this.size * 2 : '';
    const rect = this.createRec(0, 0, this.size, 'white', rx);
    const mask = ['<mask', id, size, type, units, crd, '>', rect, '</mask>'];
    const res = [mask, `<g mask="url(#${htmlId})">`, body, '</g>']
      .flat(1)
      .join(' ');
    return res;
  }

  createBlock(x, y, size, bgColor) {
    if (this.element === 'square') {
      return this.createRec(x, y, size, bgColor);
    }
    return this.createCircle(x, y, size, bgColor);
  }

  createBackground(bgColor) {
    return this.createRec(0, 0, this.size, bgColor);
  }

  createRec(xCord, yCord, size, bgColor, rad) {
    const x = `x="${xCord}"`;
    const y = `y="${yCord}"`;
    const width = `width="${size}"`;
    const height = `height="${size}"`;
    const fill = `fill="${bgColor}"`;
    const rx = rad ? `rx="${rad}"` : '';
    return ['<rect', x, y, width, height, rx, fill, '/>'].join(' ');
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
