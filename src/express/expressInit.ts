import { BaseInit, InitOptions } from '../baseInit';
import { SDK_NAME, SDK_VERSION } from './version';
import { Event } from '../type';

class ExpressInit extends BaseInit {
  public constructor(options: InitOptions) {
    super(options);
  }

  protected createEvent(event: Event) {
    event.platform = event.platform || 'node-express';
    event.sdk = {
      ...event.sdk,
      name: SDK_NAME,
      version: SDK_VERSION,
    };
    return super.createEvent(event);
  }

  /* protected createEvent(err, req: Request, res, next) {
    {
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform
    }
  } */
}

export let Santry;

export const SantryInit = (options: InitOptions) => {
  Santry = new ExpressInit(options);
};
