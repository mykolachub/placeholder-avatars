'use strict';

const types = ['square', 'round'];
const variants = ['square', 'cicle', 'grid'];
const defaultColors = ['#a32c28', '#1c090b', '#384030', '#7b8055', '#bca875'];
const defaultBg = '#a32c28';
const amount = { from: 1, to: 10, default: 5 };
const size = { from: 100, to: 1000, default: 512 };

module.exports = {
  types,
  variants,
  defaultColors,
  defaultBg,
  amount,
  size,
};
