import * as common from './common';
import * as option from './option';
import * as user from './user';
import * as userAgent from './userAgent';
import * as error from './error';

export interface Event {
  release?: option.Release;
  environment?: option.Environment;
  timeStamp: common.Timestamp;
  createdBy?: user.User;
  os?: userAgent.Os;
  browser?: userAgent.Browser;
  platform?: common.Platform;
  sdk?: common.Sdk;
  url?: string;
  type?: error.ErrorType; // error.name
  value?: error.ErrorValue; // error.message
  stacktrace?: error.StackTrace[]; // error.stack
}
