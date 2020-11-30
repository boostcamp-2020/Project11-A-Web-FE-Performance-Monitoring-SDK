import { Event } from '@santry/types';
import * as ErrorStackParser from 'error-stack-parser';
import { UAParser } from 'ua-parser-js';
import { parseDsn } from '@santry/utils';
import axios from 'axios';

export abstract class BaseSantry {
  private readonly dsn?: string;
  private readonly options?: any;

  public constructor(dsn: string) {
    this.dsn = dsn;
  }

  protected abstract platform;
  public abstract handleUncaughtError(error: Error): void;
  public abstract handleUncaughtRejection(
    rejection: PromiseRejectionEvent,
  ): void;

  public createEventFromError(event: Event, error: Error): Event {
    const parsedStackList = ErrorStackParser.parse(error);
    event.type = error.name;
    event.value = error.message;
    if (parsedStackList) {
      event.stacktrace = parsedStackList.map((stack) => {
        return {
          filename: stack.fileName,
          function: stack.functionName,
          lineno: stack.lineNumber,
          colno: stack.columnNumber,
        };
      });
    }
    return event;
  }

  public addUserAgentInfo(event: Event, userAgent: string): void {
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
  }

  public captureError(error: Error): Event {
    const event: Event = {
      timeStamp: new Date(),
      sdk: {
        name: 'santry',
        version: '0.1.0',
      },
    };
    return this.createEventFromError(event, error);
  }

  public sendEvent(event: Event): void {
    const { token, url } = parseDsn(this.dsn);
    const baseURL = `http://${url}`;

    const request = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application-json',
        'Content-type': 'application-json',
      },
      withCredentials: true,
    });

    request.post('/');
  }
}
