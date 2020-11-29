import { AxiosInstance } from 'axios';

export interface Event {
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
  context?: Stack<Stack<string>>; // error context
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
  projectId: number;
  token: string;
  baseAxios?: AxiosInstance;
  sdk?: {
    version: string;
    name: string;
  };
  platform?: string;
}

export class Stack<T> {
  private data: T[] = [];

  constructor() {}

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T {
    return this.data.pop();
  }

  size(): number {
    return this.data.length;
  }
}
