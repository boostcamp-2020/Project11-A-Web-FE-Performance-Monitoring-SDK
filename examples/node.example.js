const { init, captureError, captureMessage } = require('@santry/node');

const dsn = '[token]@[url]';

init(dsn, {
  traceSampleRate: 1,
  release: 'santry@0.0.1',
  environment: 'production',
  unhandledRejectionLevel: 'critical',
  uncaughtExceptionLevel: 'warning',
});

captureMessage("hello I'm Hera", 'hi!');
const testError = () => {
  try {
    throw new Error('testing Error');
  } catch (error) {
    captureError(error);
  }
};

testError();

const testUnhandledRejection = () => {
  this.loaded = Promise.reject(new Error('Resource not yet loaded!'));
};

const resource = testUnhandledRejection();
