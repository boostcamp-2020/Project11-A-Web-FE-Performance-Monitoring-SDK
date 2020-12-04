import { UAParser } from 'ua-parser-js';

export const parseUserAgentInfo = (userAgent: string): Event => {
  const event: any = {};
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
