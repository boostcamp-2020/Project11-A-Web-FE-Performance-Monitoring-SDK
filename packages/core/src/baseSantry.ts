import { Event, Options, Sdk } from '@santry/types';
import * as ErrorStackParser from 'error-stack-parser';
import { UAParser } from 'ua-parser-js';
import { parseDsn } from '@santry/utils';
import axios from 'axios';

export abstract class BaseSantry {
  private readonly dsn: string;
  private readonly options?: Options;
  protected platform: string;
  protected sdk: Sdk;

  public constructor(dsn: string, options: Options = {}) {
    this.dsn = dsn;
    this.options = options;
  }

  public abstract handleUncaughtError(error: Error): void;
  public abstract handleUncaughtRejection(
    rejection: PromiseRejectionEvent,
  ): void;

  public createEventFromError(error: Error): Event {
    const event: Event = {
      timeStamp: new Date(),
      platform: this.platform,
      sdk: this.sdk,
    };

    const parsedStackList = ErrorStackParser.parse(error);
    event.environment = 'production';
    if (this.options.release) {
      event.release = this.options.release;
    }

    if (this.options.environment) {
      event.environment = this.options.environment;
    }
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
    return this.createEventFromError(error);
  }

  public sendEvent(event: Event): void {
    // traceSampleRate option
    console.log(event);
    if (
      this.options.traceSampleRate &&
      Math.random() > this.options.traceSampleRate
    ) {
      return;
    }

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

    request.post('/', event);
  }
}
