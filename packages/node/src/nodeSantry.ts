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
    this.createEvent(error);
  }

  public captureMessage(message: Message): void {
    this.createEvent(message);
  }

  public handleUncaughtError(error: Error): void {
    return;
  }

  public handleUncaughtRejection(rejection: PromiseRejectionEvent): void {
    return;
  }
}
