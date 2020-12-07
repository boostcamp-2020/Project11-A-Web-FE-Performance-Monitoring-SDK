import * as common from './common';
import * as option from './option';
import * as user from './user';
import * as userAgent from './userAgent';
import * as error from './error';
import * as context from './context';
import * as message from './message';
export interface Event {
  runtime?: string;
  serverName?: string;
  contexts?: context.Contexts;
  level?: string;
  error?: {
    type?: error.ErrorType;
    value?: error.ErrorValue;
    stacktrace?: error.StackTrace[];
    errorContexts?: error.ErrorContexts;
  };
  transaction?: string;
  message?: message.Message;
  release?: option.Release;
  environment?: option.Environment;
  timeStamp?: common.Timestamp;
  createdBy?: user.User;
  os?: userAgent.Os;
  browser?: userAgent.Browser;
  platform?: common.Platform;
  sdk?: common.Sdk;
  url?: string;
}
