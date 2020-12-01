const { init, captureError } = require('@santry/node');

const dsn = '[token]@[url]';

init(dsn, {
  traceSampleRate: 0.2,
  release: 'santry@0.0.1',
  environment: 'production',
});

const testError = () => {
  try {
    throw new Error('testing Error');
  } catch (error) {
    captureError(error);
  }
};

testError();
