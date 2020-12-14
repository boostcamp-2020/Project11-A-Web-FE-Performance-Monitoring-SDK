import * as event from './event';

export type Dsn = string;

export interface Santry {
  onUncaughtException(error: Error): void;
  onUnhandledRejection(rejection: PromiseRejectionEvent): void;
  captureError(error: Error, level?: string): void;
  captureMessage(message: event.Message, level?: string): void;
  sendEvent(event: event.Event): void;
  createEvent(
    content: Error | string,
    ...extraInfo: Record<string, any>[]
  ): void;
  setContext(title: event.ContextTitle, context: event.Context): void;
}

export interface SantryGlobalObject {
  santry: {
    dsn?: Dsn;
    hub?: Santry;
  };
}

export type SantryClass = new (dsn: Dsn, options: event.Options) => Santry;
