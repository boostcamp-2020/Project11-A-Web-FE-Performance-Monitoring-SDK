import { SantryClass } from '@santry/types';
import { getGlobalObject } from '@santry/utils';

export const initWithClass = (santryClass: SantryClass, dsn: string): void => {
  const santry = new santryClass(dsn);
  const globalObject = getGlobalObject();
  globalObject.santry = {
    dsn,
    hub: santry,
  };
};
