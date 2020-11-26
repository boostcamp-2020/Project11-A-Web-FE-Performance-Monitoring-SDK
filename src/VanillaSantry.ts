import BaseSantry from './baseSantry';
import { Event } from '../type';

export class VanillaSantry extends BaseSantry {
  platform = 'vanillaJS';

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
