import { BaseSantry } from '@santry/core';
import { Options, Dsn, Message } from '@santry/types';
export declare class BrowserSantry extends BaseSantry {
    constructor(dsn: Dsn, options: Options);
    captureError(error: Error): void;
    captureMessage(message: Message): void;
    handleUncaughtError(error: Error): void;
    handleUncaughtRejection(rejection: PromiseRejectionEvent): void;
}
