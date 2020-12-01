import * as http from 'http';
import {
  parseRequest,
  getGlobalObject,
  expressUserAgentInfo,
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
    const event = santry.hub.createEventFromError(
      error,
      parseRequest(req),
      expressUserAgentInfo(req),
    );
    santry.hub.sendEvent(event);
    next();
  };
};
