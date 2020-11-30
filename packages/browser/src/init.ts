import { getGlobalObject } from '@santry/utils';
import { SantryClass } from '@santry/types';
import { BrowserSantry } from './browserSantry';

const initWithClass = (santryClass: SantryClass, dsn: string): void => {
  const santry = new santryClass(dsn);
  const globalObject = getGlobalObject();
  globalObject.santry = {
    dsn,
    hub: santry,
  };
};

export const init = (dsn: string) => {
  initWithClass(BrowserSantry, dsn);
};

export const captureError = (error: Error): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.captureError(error);
};
