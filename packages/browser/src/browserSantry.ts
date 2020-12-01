import { BaseSantry } from '@santry/core';
import { Event, Options } from '@santry/types';
import packages from '../package.json';

export class BrowserSantry extends BaseSantry {
  public constructor(dsn: string, options: Options) {
    super(dsn, options);
    this.platform = 'browser';
    this.sdk = { name: packages.name, version: packages.version };
  }
  platform = 'browser';

  public captureError(error: Error): Event {
    const event = this.createEventFromError(error);
    this.sendEvent(event);

    /* const { userAgent } = window.navigator;
    this.addUserAgentInfo(event, userAgent); */

    return event;
  }

  public handleUncaughtError(error: Error): void {
    return;
  }

  public handleUncaughtRejection(rejection: PromiseRejectionEvent): void {
    return;
  }
}
