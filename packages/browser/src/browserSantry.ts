import { BaseSantry } from '@santry/core';
import { Event, Options, Dsn, Message } from '@santry/types';
import packages from '../package.json';
import { browserUserAgentInfo } from '@santry/utils';

export class BrowserSantry extends BaseSantry {
  public constructor(dsn: Dsn, options: Options) {
    super(dsn, options);
    this.platform = 'browser';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error): Event {
    const event = this.createEvent(error, browserUserAgentInfo());
    this.sendEvent(event);
    return event;
  }

  public captureMessage(message: Message): void {
    const event = this.createEvent(message, browserUserAgentInfo());
    this.sendEvent(event);
  }

  public handleUncaughtError(error: Error): void {
    return;
  }

  public handleUncaughtRejection(rejection: PromiseRejectionEvent): void {
    return;
  }
}
