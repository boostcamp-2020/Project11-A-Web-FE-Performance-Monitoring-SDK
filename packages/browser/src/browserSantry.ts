import { BaseSantry } from '@santry/core';
import { Event } from '@santry/types';

export class BrowserSantry extends BaseSantry {
  platform = 'browser';

  public captureError(error: Error): Event {
    const event = super.captureError(error);
    event.platform = this.platform;

    const { userAgent } = window.navigator;
    this.addUserAgentInfo(event, userAgent);

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
