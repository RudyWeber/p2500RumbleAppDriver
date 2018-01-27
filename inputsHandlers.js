const robot = require('robotjs');

const bindings = require('./bindings');
const controllerInfo = require('./controllerInfo');
const utils = require('./utils');

const notImplemented = () => {};

const arrowsHandler = keyState => arrows => {
  const direction = controllerInfo.arrowValueToDirection(arrows);

  direction && robot.keyToggle(bindings.arrows[direction], keyState);
};

const buttonsHandler = keyState => (prevButtons, currentButtons) => {
  const diff =
    keyState === 'up'
      ? utils.diff(prevButtons, currentButtons)
      : utils.diff(currentButtons, prevButtons);

  utils
    .decomposeInPowersOfTwo(diff)
    .map(controllerInfo.decimalValueToButtonId)
    .forEach(button => {
      robot.keyToggle(bindings.buttons[button], keyState);
    });
};

const keyUpHandlers = {
  leftJoystick1: notImplemented,
  leftJoystick2: notImplemented,
  rightJoystick1: notImplemented,
  rightJoystick2: notImplemented,
  buttons: buttonsHandler('up'),
  arrows: arrowsHandler('up')
};

const keyDownHandlers = {
  leftJoystick1: notImplemented,
  leftJoystick2: notImplemented,
  rightJoystick1: notImplemented,
  rightJoystick2: notImplemented,
  buttons: buttonsHandler('down'),
  arrows: arrowsHandler('down')
};

module.exports = {
  onKeyUp: keyUpHandlers,
  onKeyDown: keyDownHandlers
};
