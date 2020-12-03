import * as http from 'http';
import {
  parseRequest,
  getGlobalObject,
  parseUserAgentInfo,
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
      parseRequest(req),
      parseUserAgentInfo(req.headers['user-agent']),
    );
    next();
  };
};
