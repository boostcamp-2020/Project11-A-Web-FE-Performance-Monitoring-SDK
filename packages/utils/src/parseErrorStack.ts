import fs from 'fs';
import { parse } from 'error-stack-parser';

export const parseErrorStack = (error: Error): any => {
  const event: any = {};
  const parsedStackList = parse(error);
  event.type = error.name;
  event.value = error.message;
  const newStack: string[][] = [];
  if (parsedStackList) {
    event.stacktrace = parsedStackList.map((stack) => {
      try {
        String(stack).replace(/(\\r\\n|\\n|\\r)/gm, '\\n');
        const LinesArray: string[] = [];
        const file = fs.readFileSync(stack.fileName).toString().split('\n');
        const startline = stack.lineNumber < 3 ? 1 : stack.lineNumber - 2;
        const endline =
          stack.lineNumber + 2 > file.length
            ? file.length
            : stack.lineNumber + 2;
        let i: number;
        for (i = startline; i < endline + 1; i++) {
          LinesArray.push(file[i - 1]);
        }
        newStack.push(LinesArray);
        return {
          filename: stack.fileName,
          function: stack.functionName,
          lineno: stack.lineNumber,
          colno: stack.columnNumber,
        };
      } catch {
        newStack.push([]);
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
