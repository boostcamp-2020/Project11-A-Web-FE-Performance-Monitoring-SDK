const { init, captureError } = require('@santry/node');

const dsn = '[token]@[url]';

init(dsn);

const testError = () => {
  try {
    throw new Error('testing Error');
  } catch (error) {
    captureError(error);
  }
};

testError();
