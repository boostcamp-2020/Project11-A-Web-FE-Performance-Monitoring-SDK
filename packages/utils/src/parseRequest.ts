import { Event } from '@santry/types';
import os from 'os';

export const parseRequest: any = (req: any): Event => {
  const event: any = {};
  event.version = process.version;
  event.platform = process.platform;
  event.serverName = os.hostname();
  event.transaction = `${req.method} ${req.url}`;
  if (req.ip) {
    event.createdBy = {
      ...event.createdBy,
      ipAdress: req.ip,
    };
  }

  if (req.originalUrl && req.protocol && (req.host || req.hostname)) {
    const protocol = req.protocol;
    const host = req.host || req.hostname;
    const originalUrl = req.originalUrl;
    event.url = `${protocol}://${host}${originalUrl}`;
  }

  return event;
};
