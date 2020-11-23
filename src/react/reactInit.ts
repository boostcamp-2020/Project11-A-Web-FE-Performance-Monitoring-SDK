import { BaseInit, InitOptions } from '../baseInit';
import { SDK_NAME, SDK_VERSION } from './version';
import { Event } from '../type';

class ReactInit extends BaseInit {
  public constructor(options: InitOptions) {
    super(options);
  }

  protected createEvent(event: Event) {
    event.platform = event.platform || 'react';
    event.sdk = {
      ...event.sdk,
      name: SDK_NAME,
      version: SDK_VERSION,
    };
    return super.createEvent(event);
  }
}

export let Santry;

export const init = (options: InitOptions) => {
  Santry = new ReactInit(options);
};
