import { ErrorContexts, StackTrace } from '@santry/types';
import ErrorStackParser from 'error-stack-parser';

export const getErrorContext = (fs: any, error: Error): any => {
  const event: {
    errorContexts?: ErrorContexts[];
  } = {};
  const parsedStackList = ErrorStackParser.parse(error);
  if (parsedStackList) {
    event.errorContexts = [];
    parsedStackList.forEach((stack) => {
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
        event.errorContexts.push(newStack);
      } catch {
        event.errorContexts.push({
          preErrorContext: [],
          errorContext: [],
          postErrorContext: [],
        });
      }
    });
  }
  const result = { error: event };
  return result;
};
