import { getGlobalObject } from '@santry/utils';
import { NodeSantry } from './nodeSantry';
import { Options } from '@santry/types';
import { initWithClass } from '@santry/core';

export const init = (dsn: string, options: Options): void => {
  initWithClass(NodeSantry, dsn, options);
};

export const captureError = (error: Error): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.captureError(error);
};

export const setContext = (title: string, contents: any): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.setContext(title, contents);
};

export const setLevel = (level: string): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.setLevel(level);
};
