import { ErrorType, ErrorValue, StackTrace } from '@santry/types';
import ErrorStackParser from 'error-stack-parser';

export const getErrorInfo = (error: Error): any => {
  const event: {
    type?: ErrorType;
    value?: ErrorValue;
    stacktrace?: StackTrace[];
  } = {};
  const parsedStackList = ErrorStackParser.parse(error);
  if (parsedStackList) {
    event.stacktrace = parsedStackList.map((stack) => {
      try {
        String(stack).replace(/(\\r\\n|\\n|\\r)/gm, '\\n');
        return {
          filename: stack.fileName,
          function: stack.functionName,
          lineno: stack.lineNumber,
          colno: stack.columnNumber,
        };
      } catch {
        return {
          filename: stack.fileName,
          function: stack.functionName,
          lineno: stack.lineNumber,
          colno: stack.columnNumber,
        };
      }
    });
  }
  event.type = error.name;
  event.value = error.message;
  return event;
};
