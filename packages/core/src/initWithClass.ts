import { SantryClass, Options } from '@santry/types';
import { getGlobalObject } from '@santry/utils';

export const initWithClass = (
  santryClass: SantryClass,
  dsn: string,
  options: Options,
): void => {
  const santry = new santryClass(dsn, options);
  const globalObject = getGlobalObject();
  globalObject.santry = {
    dsn,
    hub: santry,
  };
};
