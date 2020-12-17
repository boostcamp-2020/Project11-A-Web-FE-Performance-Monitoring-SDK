import * as http from 'http';
import { NextFunction } from 'express';
import fs from 'fs';
import {
  getErrorContext,
  parseRequest,
  getGlobalObject,
  parseUserAgentInfo,
  getNodeEtcInfo,
  getLevel,
} from '@santry/utils';

export const errorHandler = (
  level: string,
): ((
  error: Error,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: NextFunction,
) => void) => {
  return function errorMiddleware(
    error: Error,
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: NextFunction,
  ) {
    const { santry } = getGlobalObject<NodeJS.Global>();
    santry.hub.createEvent(
      error,
      getLevel({ isError: true, level: level }),
      getErrorContext(fs, error),
      getNodeEtcInfo(),
      parseRequest(req),
      parseUserAgentInfo(req.headers['user-agent']),
    );
    next(error);
  };
};
