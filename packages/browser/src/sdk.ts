import { getGlobalObject } from '@santry/utils';
import { Options, Message, Dsn, ContextTitle, Context } from '@santry/types';
import { BrowserSantry } from './browserSantry';
import { initWithClass } from '@santry/core';

export const init = (dsn: Dsn, options: Options): void => {
  initWithClass(BrowserSantry, dsn, options);
};

export const captureError = (error: Error): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.captureError(error);
};

export const captureMessage = (message: Message): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.captureMessage(message);
};

export const setContext = (title: ContextTitle, context: Context): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.setContext(title, context);
};

export const setLevel = (level: string): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.setLevel(level);
};
