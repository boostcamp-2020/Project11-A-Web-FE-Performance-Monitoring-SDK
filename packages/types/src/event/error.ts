export interface StackTrace {
  filename?: string;
  function?: string;
  lineno?: number;
  colno?: number;
}

export type ErrorType = string;
export type ErrorValue = string;
export type ErrorContexts = string[];
