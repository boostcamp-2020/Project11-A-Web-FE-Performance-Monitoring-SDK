import * as http from 'http';
import fs from 'fs';
import {
  parseErrorStack,
  parseRequest,
  getGlobalObject,
  parseUserAgentInfo,
  getNodeEtcInfo,
} from '@santry/utils';

export const errorHandler = (): ((
  error: Error,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: () => void,
) => void) => {
  return function errorMiddleware(
    error: Error,
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: () => void,
  ) {
    const { santry } = getGlobalObject<NodeJS.Global>();
    santry.hub.createEvent(
      error,
      parseErrorStack(fs, error),
      getNodeEtcInfo(),
      parseRequest(req),
      parseUserAgentInfo(req.headers['user-agent']),
    );
    next();
  };
};
