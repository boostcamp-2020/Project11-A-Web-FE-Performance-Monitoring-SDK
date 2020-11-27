import * as http from 'http';
import { UAParser } from 'ua-parser-js';
import { Event } from '../type';

export const parseRequest = (
  event: Event,
  req: {
    method?: string;
    ip?: string;
    originalUrl?: string;
    protocol?: string;
    host?: string;
    hostname?: string;
    headers?: http.IncomingHttpHeaders;
  },
): Event => {
  if (req.ip) {
    event.createdBy = {
      ...event.createdBy,
      ipAdress: req.ip,
    };
  }
  //Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
  if (req.headers) {
    const userAgent = req.headers['user-agent'];
    const uaParser = new UAParser();
    const parsedUserAgent = uaParser.setUA(userAgent);
    event.os = {
      ...event.os,
      name: parsedUserAgent.getOS().name,
      version: parsedUserAgent.getOS().version,
    };

    event.browser = {
      ...event.browser,
      name: parsedUserAgent.getBrowser().name,
      version: parsedUserAgent.getBrowser().version,
    };

    return event;
  }

  if (req.originalUrl && req.protocol && (req.host || req.hostname)) {
    const protocol = req.protocol;
    const host = req.host || req.hostname;
    const originalUrl = req.originalUrl;
    event.url = `${protocol}://${host}${originalUrl}`;
  }
};
