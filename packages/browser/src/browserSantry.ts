import { BaseSantry } from '@santry/core';
import { Event, Options } from '@santry/types';
import packages from '../package.json';
import { browserUserAgentInfo } from '@santry/utils';

export class BrowserSantry extends BaseSantry {
  public constructor(dsn: string, options: Options) {
    super(dsn, options);
    this.platform = 'browser';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error): Event {
    const event = this.createEventFromError(error, browserUserAgentInfo());
    this.sendEvent(event);
    return event;
  }

  public handleUncaughtError(error: Error): void {
    return;
  }

  public handleUncaughtRejection(rejection: PromiseRejectionEvent): void {
    return;
  }
}
