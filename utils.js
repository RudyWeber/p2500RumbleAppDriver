const decomposeInPowersOfTwo = (n, terms = [], power = 1) =>
  n
    ? decomposeInPowersOfTwo(
        n >> 1,
        1 & n ? [...terms, power] : terms,
        power << 1
      )
    : terms;

const diff = (a, b) => (b ? ~b & a : a);

const bufferToArray = buffer =>
  buffer.reduce((acc, value) => [...acc, value], []);

const bufferToObject = buffer => {
  const bufferArray = bufferToArray(buffer);

  return {
    leftJoystick1: bufferArray[1],
    leftJoystick2: bufferArray[2],
    rightJoystick1: bufferArray[3],
    rightJoystick2: bufferArray[4],
    buttons: bufferArray[5],
    arrows: bufferArray[6]
  };
};

module.exports = {
  bufferToObject,
  decomposeInPowersOfTwo,
  diff
};
