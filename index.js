'use strict';

const Placeholder = require('./lib/placeholder.js');

// const fs = require('fs');

// #dfba69 #2a2c31 #fffedf #3e4147 #5a2e2e
// colors: ['#dfba69', '#2a2c31', '#fffedf', '#3e4147', '#5a2e2e'],

const props = {
  type: 'circle',
  variant: 'grid',
  elements: 'circle',
  density: 10,
  amount: 10,
};

const placeholder1 = new Placeholder(null, props);
// fs.writeFile('./test.svg', image, err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

// const svgId = document.getElementById('svg-id');
// const svgClass = document.querySelector('svg-class');

// const image1 = placeholder1.generate();
// const image2 = placeholder2.generate();

// svgId.innerHTML = image1;
// svgClass.innerHTML = image2;
