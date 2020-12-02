export { Level } from './level';

export interface Event {
  release?: string;
  environment?: string;
  timeStamp: Date;
  createdBy?: User;
  os?: Os;
  browser?: Browser;
  platform?: string;
  sdk?: Sdk;
  url?: string;
  type?: string; // error.name
  value?: string; // error.message
  stacktrace?: StackTrace[]; // error.stack
}

export interface Sdk {
  version: string;
  name: string;
}

export interface Client {
  id: number;
  email: string;
  projectIds: number[];
}

export interface User {
  ipAdress?: string;
  email?: string;
}

export interface Os {
  version: string;
  name: string;
}

export interface Browser {
  version: string;
  name: string;
}

export interface StackTrace {
  filename?: string;
  function?: string;
  lineno?: number;
  colno?: number;
}
export interface Options {
  traceSampleRate?: number;
  release?: string;
  environment?: string;
}

export interface Santry {
  handleUncaughtError(error: Error): void;
  handleUncaughtRejection(rejection: PromiseRejectionEvent): void;
  captureError(error: Error): Event;
  sendEvent(event: Event): void;
  createEvent(content: Error | string, ...extraInfo: any[]): Event;
  setContext(title: string, contents: any): void;
  setLevel(level: string);
}

export interface SantryGlobalObject {
  santry: {
    dsn?: string;
    hub?: Santry;
  };
}

export type SantryClass = new (dsn: string, options: Options) => Santry;
