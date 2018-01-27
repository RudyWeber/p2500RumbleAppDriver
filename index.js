const usb = require('usb');

const controllerInfo = require('./controllerInfo');
const inputsHandlers = require('./inputsHandlers');
const utils = require('./utils');

const VENDOR_ID = 1699; // 0x06a3
const PRODUCT_ID = 65292; // 0xff0c

const device = usb.findByIds(VENDOR_ID, PRODUCT_ID);

if (!device) {
  console.log('Device not found.');
  process.exit(-1);
}

device.open();

const interface = device.interface(0);
interface.claim();

const inEndpointInterface = interface.endpoint(129);
inEndpointInterface.startPoll();

process.on('SIGINT', () => {
  inEndpointInterface.stopPoll(process.exit);
});

const handleControllerData = (data, prevData) => {
  const currentState = utils.bufferToObject(data);
  const prevState = utils.bufferToObject(prevData);

  Object.keys(currentState).forEach(inputType => {
    if (
      prevState[inputType] !== currentState[inputType] &&
      (inputType === 'buttons' || inputType === 'arrows')
    ) {
      inputsHandlers.onKeyUp[inputType](
        prevState[inputType],
        currentState[inputType]
      );

      inputsHandlers.onKeyDown[inputType](
        prevState[inputType],
        currentState[inputType]
      );
    }
  });
};

let prevBuffer = controllerInfo.defaultBufferState;
inEndpointInterface.on('data', data => {
  if (!data.equals(prevBuffer)) {
    handleControllerData(data, prevBuffer);
    prevBuffer = data;
  }
});
