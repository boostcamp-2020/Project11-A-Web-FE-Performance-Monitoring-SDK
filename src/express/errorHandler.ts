import * as http from 'http';
import { parseRequest } from './parseRequest';
import { captureError, createEventFromError } from '../core/index';

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
    const timeStamp = new Date();
    const baseEvent = {
      timeStamp,
    };
    const event = parseRequest(baseEvent, req);
    captureError(createEventFromError(event, error));
    next();
  };
};
