import { getNodeEtcInfo, getLevel, getErrorContext } from '@santry/utils';
import { BaseSantry } from '@santry/core';
import { Dsn, Message, Options } from '@santry/types';
import packages from '../package.json';
import fs from 'fs';

export class NodeSantry extends BaseSantry {
  public constructor(dsn: Dsn, options?: Options) {
    super(dsn, options);
    this.platform = 'node';
    this.sdk = { name: packages.name, version: packages.version };
  }

  public captureError(error: Error, level?: string): void {
    this.createEvent(
      error,
      getErrorContext(fs, error),
      getLevel({ isError: true, level }),
      getNodeEtcInfo(),
    );
  }

  public captureMessage(message: Message, level?: string): void {
    this.createEvent(
      message,
      getLevel({ isError: false, level }),
      getNodeEtcInfo(),
    );
  }

  protected onUncaughtException(): void {
    process.on('uncaughtException', (error: Error) => {
      const level = this.options.uncaughtExceptionLevel;
      this.createEvent(
        error,
        getErrorContext(fs, error),
        getLevel({ isError: true, level }),
        getNodeEtcInfo(),
      );
    });
    return;
  }
  protected onUnhandledRejection(): void {
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
      const level = this.options.unhandledRejectionLevel;
      this.createEvent(
        reason,
        getErrorContext(fs, reason),
        getLevel({ isError: true, level }),
        getNodeEtcInfo(),
      );
    });
    return;
  }
}
