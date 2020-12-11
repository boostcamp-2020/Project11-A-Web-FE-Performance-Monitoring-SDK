import { UAParser } from 'ua-parser-js';
import { Event } from '@santry/types';

export const parseUserAgentInfo = (userAgent: string): Event => {
  const event: Event = {};
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
};
