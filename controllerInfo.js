const directions = {
  0: 'N',
  16: 'NE',
  32: 'E',
  48: 'SE',
  64: 'S',
  80: 'SW',
  96: 'W',
  112: 'NW',
  240: ''
};

const buttonsIds = {
  1: '1',
  2: '2',
  4: '3',
  8: '4',
  16: '5',
  32: '6',
  64: '7',
  128: '8'
};

const arrowValueToDirection = arrowId => directions[arrowId];
const decimalValueToButtonId = binary => buttonsIds[binary];

const defaultBufferState = Buffer.from([1, 125, 127, 129, 132, 0, 240]);

module.exports = {
  arrowValueToDirection,
  decimalValueToButtonId,
  defaultBufferState
};
