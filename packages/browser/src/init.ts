import { getGlobalObject } from '@santry/utils';
import { Options } from '@santry/types';
import { BrowserSantry } from './browserSantry';
import { initWithClass } from '@santry/core';

const { santry } = getGlobalObject<Window>();

export const init = (dsn: string, options: Options) => {
  initWithClass(BrowserSantry, dsn, options);
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
