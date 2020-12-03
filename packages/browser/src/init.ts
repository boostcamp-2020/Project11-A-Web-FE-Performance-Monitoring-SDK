import { getGlobalObject } from '@santry/utils';
import { Options, Message, Dsn, Title, Contents } from '@santry/types';
import { BrowserSantry } from './browserSantry';
import { initWithClass } from '@santry/core';

const { santry } = getGlobalObject<Window>();

export const init = (dsn: Dsn, options: Options): void => {
  initWithClass(BrowserSantry, dsn, options);
};

export const captureError = (error: Error): void => {
  santry.hub.captureError(error);
};

export const captureMessage = (message: Message): void => {
  santry.hub.captureMessage(message);
};

export const setContext = (title: Title, contents: Contents): void => {
  santry.hub.setContext(title, contents);
};

export const setLevel = (level: string): void => {
  santry.hub.setLevel(level);
};
