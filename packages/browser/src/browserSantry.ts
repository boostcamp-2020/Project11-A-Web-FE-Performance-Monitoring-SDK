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
    /* const { userAgent } = window.navigator;
    const user = this.addUserAgentInfo(userAgent);
    */
    const event = this.createEventFromError(error);
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
