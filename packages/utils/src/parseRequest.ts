import { Event } from '@santry/types';

export const parseRequest = (req: any): Event => {
  const event: Event = {};
  event.transaction = `${req.method} ${req.url}`;
  if (req.ip) {
    event.createdBy = {
      ipAddress: req.ip,
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
