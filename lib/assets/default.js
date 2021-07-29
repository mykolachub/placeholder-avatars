'use strict';

const types = ['square', 'circle'];
const patterns = ['grid', 'random'];
const elements = ['square', 'circle'];
const defaultColors = 'random';
const defaultBg = 'white';
const amount = { from: 1, to: 10, default: 5 };
const density = { from: 2, to: 10, default: 8 };
const size = { from: 32, to: 1024, default: 512 };

module.exports = {
  types,
  patterns,
  defaultColors,
  defaultBg,
  amount,
  size,
  elements,
  density,
};
