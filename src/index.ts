import * as Express from './express';
import * as React from './react';

function captureExceptionTest(error: Error): Error {
  return error;
}
export default { captureExceptionTest, Express, React };
