/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BaseSantry } from '@santry/core';
import { Event } from '@santry/types';

export class NodeSantry extends BaseSantry {
  platform = 'vanillaJS';

  public captureError(error: Error): Event {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
