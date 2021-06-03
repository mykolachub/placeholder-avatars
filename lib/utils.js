'use strict';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

module.exports.utils = {
  getRandom,
};
