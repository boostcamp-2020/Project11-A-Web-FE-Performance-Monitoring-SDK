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
    errorContexts?: ErrorContexts[];
    stackTrace?: StackTrace[];
  } = {};
  const parsedStackList = parse(error);
  event.type = error.name;
  event.value = error.message;
  const newErrorContexts: ErrorContexts[] = [];
  if (parsedStackList) {
    event.stackTrace = parsedStackList.map((stack) => {
      try {
        const newStack: ErrorContexts = {
          preErrorContext: [],
          errorContext: [],
          postErrorContext: [],
        };
        String(stack).replace(/(\\r\\n|\\n|\\r)/gm, '\\n');
        const file = fs.readFileSync(stack.fileName).toString().split('\n');
        const startLine = stack.lineNumber < 5 ? 1 : stack.lineNumber - 6;
        const middleLine = stack.lineNumber - 1;
        const endLine =
          stack.lineNumber + 5 > file.length
            ? file.length
            : stack.lineNumber + 4;
        let i: number;
        for (i = startLine; i < endLine; i++) {
          if (i === middleLine) {
            newStack.errorContext.push(file[i]);
          }
          if (i < middleLine) {
            newStack.preErrorContext.push(file[i]);
          }
          if (i > middleLine) {
            newStack.postErrorContext.push(file[i]);
          }
        }
        newErrorContexts.push(newStack);
        return {
          filename: stack.fileName,
          function: stack.functionName,
          lineno: stack.lineNumber,
          colno: stack.columnNumber,
        };
      } catch {
        newErrorContexts.push({
          preErrorContext: [],
          errorContext: [],
          postErrorContext: [],
        });
        return {
          filename: stack.fileName,
          function: stack.functionName,
          lineno: stack.lineNumber,
          colno: stack.columnNumber,
        };
      }
    });
  }
  event.errorContexts = newErrorContexts;
  return event;
};
