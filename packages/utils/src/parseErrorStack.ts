import {
  ErrorType,
  ErrorValue,
  ErrorContexts,
  StackTrace,
} from '@santry/types';
import fs from 'fs';
import { parse } from 'error-stack-parser';

export const parseErrorStack = (error: Error): any => {
  const event: {
    type?: ErrorType;
    value?: ErrorValue;
    errorContexts?: ErrorContexts;
    stackTrace?: StackTrace[];
  } = {};
  const parsedStackList = parse(error);
  event.type = error.name;
  event.value = error.message;
  const newStack: ErrorContexts = {
    preErrorContext: [],
    errorContext: [],
    postErrorContext: [],
  };
  if (parsedStackList) {
    event.stackTrace = parsedStackList.map((stack) => {
      try {
        String(stack).replace(/(\\r\\n|\\n|\\r)/gm, '\\n');
        const file = fs.readFileSync(stack.fileName).toString().split('\n');
        const startLine = stack.lineNumber < 6 ? 1 : stack.lineNumber - 5;
        const middleLine = stack.lineNumber;
        const endLine =
          stack.lineNumber + 5 > file.length
            ? file.length
            : stack.lineNumber + 5;
        let i: number;
        for (i = startLine; i < endLine + 1; i++) {
          if (i === middleLine) {
            newStack.errorContext.push(file[i]);
            continue;
          }
          if (i < middleLine) {
            newStack.preErrorContext.push(file[i]);
          } else {
            newStack.postErrorContext.push(file[i]);
          }
        }
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
  event.errorContexts = newStack;
  return event;
};
