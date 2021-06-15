'use strict';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const stringify = (array, devider) => array.flat(Infinity).join(devider);
const join =
  (...parts) =>
    devider =>
      stringify([parts], devider);

module.exports.utils = {
  getRandom,
  stringify,
  join,
};
