import { getGlobalObject } from '@santry/utils';
import { NodeSantry } from './nodeSantry';
import { Options, Message, Dsn, ContextTitle, Context } from '@santry/types';
import { initWithClass } from '@santry/core';

export const init = (dsn: Dsn, options: Options): void => {
  initWithClass(NodeSantry, dsn, options);
};

export const captureError = (error: Error): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.captureError(error);
};

export const captureMessage = (message: Message): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.captureMessage(message);
};

export const setContext = (title: ContextTitle, context: Context): void => {
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.setContext(title, context);
};

export const setLevel = (level: string): void => {
  console.log(level);
  const { santry } = getGlobalObject<NodeJS.Global>();
  santry.hub.setLevel(level);
};
