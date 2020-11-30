const { init, captureError } = require('@santry/node');

const dsn = 'ABC@123.123.123.123';

init.vanilla(dsn);

const testError = () => {
  try {
    throw new Error('testing Error');
  } catch (error) {
    captureError(error);
  }
};

testError();
