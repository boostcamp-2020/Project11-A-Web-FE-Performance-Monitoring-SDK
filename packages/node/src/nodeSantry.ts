import { getNodeEtcInfo } from '@santry/utils';
import { BaseSantry } from '@santry/core';
import { Dsn, Message, Options } from '@santry/types';
import packages from '../package.json';

export class NodeSantry extends BaseSantry {
  public constructor(dsn: Dsn, options: Options) {
    super(dsn, options);
    this.platform = 'node';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error): void {
    this.createEvent(error, getNodeEtcInfo());
  }

  public captureMessage(message: Message): void {
    this.createEvent(message, getNodeEtcInfo());
  }

  public onUncaughtException(): void {
    process.on('uncaughtException', (error: Error) => {
      const options = this.getOptions();
      const level = options.uncaughtExceptionLevel
        ? options.uncaughtExceptionLevel
        : 'error';
      this.setLevel(level);
      this.createEvent(error);
    });
    return;
  }
  public onUnhandledRejection(): void {
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
      const options = this.getOptions();
      const level = options.unhandledRejectionLevel
        ? options.unhandledRejectionLevel
        : 'error';
      this.setLevel(level);
      this.createEvent(reason);
    });
    return;
  }
}
