'use strict';

const types = ['square', 'round'];
const variants = ['grid', 'random'];
const elements = ['square', 'circle'];
const defaultColors = ['#a32c28', '#1c090b', '#384030', '#7b8055', '#bca875'];
const defaultBg = '#a32c28';
const amount = { from: 1, to: 10, default: 5 };
const density = { from: 2, to: 10, default: 8 };
const size = { from: 32, to: 1024, default: 512 };

module.exports = {
  types,
  variants,
  defaultColors,
  defaultBg,
  amount,
  size,
  elements,
  density,
};
