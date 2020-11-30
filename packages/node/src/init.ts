import { getGlobalObject } from '@santry/utils';
import { NodeSantry } from './nodeSantry';
import { SantryClass } from '@santry/types';

const initWithClass = (santryClass: SantryClass, dsn: string): void => {
  const santry = new santryClass(dsn);
  const globalObject = getGlobalObject();
  globalObject.santry = {
    dsn,
    hub: santry,
  };
};

export const init = (dsn: string): void => {
  initWithClass(NodeSantry, dsn);
};

export const captureError = (error: Error): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.captureError(error);
};
