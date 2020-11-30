import { BaseSantry } from '@santry/core';
import { Event } from '@santry/types';

export class NodeSantry extends BaseSantry {
  platform = 'node';

  public captureError(error: Error): Event {
    const event = super.captureError(error);
    event.platform = this.platform;
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
