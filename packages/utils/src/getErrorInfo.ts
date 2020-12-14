import { ErrorType, ErrorValue } from '@santry/types';
import fs from 'fs';
import { parse } from 'error-stack-parser';

export const getErrorInfo = (error: Error): any => {
  const event: {
    type?: ErrorType;
    value?: ErrorValue;
  } = {};
  const parsedStackList = parse(error);
  console.log(parsedStackList);
  event.type = error.name;
  event.value = error.message;

  return event;
};
