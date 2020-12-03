import { BaseSantry } from '@santry/core';
import { Options, Dsn, Message } from '@santry/types';
import packages from '../package.json';
import { parseUserAgentInfo } from '@santry/utils';

export class BrowserSantry extends BaseSantry {
  public constructor(dsn: Dsn, options: Options) {
    super(dsn, options);
    this.platform = 'browser';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error): void {
    this.createEvent(error, parseUserAgentInfo(window.navigator.userAgent));
  }

  public captureMessage(message: Message): void {
    this.createEvent(message, parseUserAgentInfo(window.navigator.userAgent));
  }

  public handleUncaughtError(error: Error): void {
    return;
  }

  public handleUncaughtRejection(rejection: PromiseRejectionEvent): void {
    return;
  }
}
