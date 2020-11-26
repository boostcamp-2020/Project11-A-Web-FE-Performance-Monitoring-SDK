import { getGlobalObject } from './index';
import { SantryClass } from './baseSantry';

export const initWithClass = (santryClass: SantryClass, dsn: string): void => {
  const santry = new santryClass(dsn);
  const globalObject = getGlobalObject();
  globalObject.santry = {
    dsn,
    hub: santry,
  };
};
