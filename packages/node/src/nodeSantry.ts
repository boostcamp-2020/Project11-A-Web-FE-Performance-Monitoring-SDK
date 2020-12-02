import { BaseSantry } from '@santry/core';
import { Event, Options } from '@santry/types';
import packages from '../package.json';

export class NodeSantry extends BaseSantry {
  public constructor(dsn: string, options: Options) {
    super(dsn, options);
    this.platform = 'node';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error): Event {
    const event = this.createEvent(error);
    this.sendEvent(event);
    return event;
  }

  public captureMessage(message: string): void {
    const event = this.createEvent(message);
    this.sendEvent(event);
  }

  public handleUncaughtError(error: Error): void {
    return;
  }

  public handleUncaughtRejection(rejection: PromiseRejectionEvent): void {
    return;
  }
}
