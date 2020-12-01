import { UAParser } from 'ua-parser-js';

export const addUserAgentInfo = (req: any): Event => {
  const userAgent = req.headers['user-agent'];
  const uaParser = new UAParser();
  const parsedUserAgent = uaParser.setUA(userAgent);
  const event: any = {};
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
