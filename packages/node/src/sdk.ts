import { getGlobalObject } from '@santry/utils';
import { NodeSantry } from './nodeSantry';
import { Options, Message, Dsn, ContextTitle, Context } from '@santry/types';
import { initWithClass } from '@santry/core';

export const init = (dsn: Dsn, options?: Options): void => {
  initWithClass(NodeSantry, dsn, options);
};

export const captureError = (error: Error, level?: string): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.captureError(error, level);
};

export const captureMessage = (message: Message, level?: string): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.captureMessage(message, level);
};

export const setContext = (title: ContextTitle, context: Context): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.setContext(title, context);
};
