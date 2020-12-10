export interface StackTrace {
  filename?: string;
  function?: string;
  lineno?: number;
  colno?: number;
}
export interface ErrorContexts {
  preErrorContext: string[];
  errorContext: string[];
  postErrorContext: string[];
}
export type ErrorType = string;
export type ErrorValue = string;
