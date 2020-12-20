import { BaseSantry } from '@santry/core';
import { Options, Dsn, Message } from '@santry/types';
import packages from '../package.json';
import { parseUserAgentInfo, getLevel, getErrorInfo } from '@santry/utils';

export class BrowserSantry extends BaseSantry {
  public constructor(dsn: Dsn, options?: Options) {
    super(dsn, options);
    this.platform = 'browser';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error, level?: string): void {
    this.createEvent(
      error,
      getLevel({ isError: true, level }),
      parseUserAgentInfo(window.navigator.userAgent),
    );
  }

  public captureMessage(message: Message, level?: string): void {
    this.createEvent(
      message,
      getLevel({ isError: false, level }),
      parseUserAgentInfo(window.navigator.userAgent),
    );
  }

  protected onUncaughtException(): void {
    window.onerror = (message, source, lineno, number, error) => {
      const level = this.options.uncaughtExceptionLevel;
      this.createEvent(
        error,
        getLevel({ isError: true, level }),
        parseUserAgentInfo(window.navigator.userAgent),
      );
    };
  }

  protected onUnhandledRejection(): void {
    window.onunhandledrejection = (event) => {
      const level = this.options.unhandledRejectionLevel;
      this.createEvent(
        event.reason,
        getErrorInfo(event.reason),
        getLevel({ isError: true, level }),
        parseUserAgentInfo(window.navigator.userAgent),
      );
    };
    return;
  }
}
