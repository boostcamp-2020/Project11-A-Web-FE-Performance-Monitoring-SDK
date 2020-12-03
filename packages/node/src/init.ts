import { getGlobalObject } from '@santry/utils';
import { NodeSantry } from './nodeSantry';
import { Options } from '@santry/types';
import { initWithClass } from '@santry/core';

const { santry } = getGlobalObject<NodeJS.Global>();

export const init = (dsn: string, options: Options): void => {
  initWithClass(NodeSantry, dsn, options);
};

export const captureError = (error: Error): void => {
  santry.hub.captureError(error);
};

export const captureMessage = (message: string): void => {
  santry.hub.captureMessage(message);
};

export const setContext = (title: string, contents: any): void => {
  santry.hub.setContext(title, contents);
};

export const setLevel = (level: string): void => {
  santry.hub.setLevel(level);
};
