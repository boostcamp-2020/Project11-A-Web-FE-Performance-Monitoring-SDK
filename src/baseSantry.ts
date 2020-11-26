/* eslint-disable @typescript-eslint/no-unused-vars */
import { Event } from './type';
import * as ErrorStackParser from 'error-stack-parser';
import { UAParser } from 'ua-parser-js';
import { parseDSN } from './utils/parseDSN';
import axios from 'axios';

export interface Santry {
  handleUncaughtError(error: Error): void;
  handleUncaughtRejection(rejection: PromiseRejectionEvent): void;
  captureError(error: Error): Event;
  sendEvent(event: Event): void;
  createEventFromError(event: Event, error: Error): Event;
  addUserAgentInfo(event: Event, userAgent: string): void;
}

export type SantryClass = new (dsn: string) => Santry;

export default abstract class BaseSantry implements Santry {
  private readonly dsn?: string;
  private readonly options?: any;

  public constructor(dsn: string) {
    this.dsn = dsn;
  }

  public abstract platform;
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

  // option : uncaughtException On, off
  // option : percent
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
    const { token, url } = parseDSN(this.dsn);
    axios
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        event,
      })
      .catch((err) => console.error(err));
  }
}
