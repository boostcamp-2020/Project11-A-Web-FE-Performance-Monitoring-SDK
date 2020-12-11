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

  public onUncaughtException(): void {
    window.onerror = (message, source, lineno, number, error) => {
      const options = this.getOptions();
      const level = options.uncaughtExceptionLevel
        ? options.uncaughtExceptionLevel
        : 'error';
      this.setLevel(level);
      this.createEvent(error);
    };
  }

  public onUnhandledRejection(): void {
    window.onunhandledrejection = (event) => {
      const options = this.getOptions();
      const level = options.unhandledRejectionLevel
        ? options.unhandledRejectionLevel
        : 'error';
      this.setLevel(level);
      this.createEvent(event.reason);
    };
    return;
  }
}
