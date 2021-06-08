import Placeholder from './lib/placeholder.js';

const placeholder = new Placeholder({
  type: 'square',
  size: 512,
  variant: 'grid',
  elements: 'square',
  amount: 9,
  density: 8,
});

const plchlrd = placeholder.generate();

const svg = document.getElementById('svg');
svg.innerHTML = plchlrd;
