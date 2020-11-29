/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getGlobalObject } from '@santry/utils';
import { NodeSantry } from './nodeSantry';

const initWithClass = (santryClass, dsn: string): void => {
  const santry = new santryClass(dsn);
  const globalObject = getGlobalObject();
  globalObject.santry = {
    dsn,
    hub: santry,
  };
};

export const init = {
  vanilla: (dsn: string): void => initWithClass(NodeSantry, dsn),
};
