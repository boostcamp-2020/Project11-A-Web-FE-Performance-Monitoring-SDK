import * as event from './event';

export type Dsn = string;

export interface Santry {
  handleUncaughtError(error: Error): void;
  handleUncaughtRejection(rejection: PromiseRejectionEvent): void;
  captureError(error: Error): void;
  captureMessage(message: event.Message): void;
  sendEvent(event: event.Event): void;
  createEvent(
    content: Error | string,
    ...extraInfo: Record<string, any>[]
  ): void;
  setContext(title: event.ContextTitle, context: event.Context): void;
  setLevel(level: string): void;
}

export interface SantryGlobalObject {
  santry: {
    dsn?: Dsn;
    hub?: Santry;
  };
}

export type SantryClass = new (dsn: Dsn, options: event.Options) => Santry;
