import * as event from './event';

export type Dsn = string;
// baseSantry interface
export interface Santry {
  captureError(error: Error, level?: string): void;
  captureMessage(message: event.Message, level?: string): void;
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
