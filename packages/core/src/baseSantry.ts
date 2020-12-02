import { Event, Options, Sdk } from '@santry/types';
import * as ErrorStackParser from 'error-stack-parser';
import { parseDsn } from '@santry/utils';
import axios from 'axios';

export abstract class BaseSantry {
  private readonly options?: Options;
  private readonly request;
  protected contexts;
  protected platform: string;
  protected sdk: Sdk;

  public constructor(dsn: string, options: Options = {}) {
    const { token, url } = parseDsn(dsn);
    const baseURL = `http://${url}`;
    this.request = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
        Cache: 'no-cache',
      },
      withCredentials: true,
    });
    this.options = options;
    this.contexts = {};
  }

  protected abstract captureError(error: Error): Event;
  public abstract handleUncaughtError(error: Error): void;
  public abstract handleUncaughtRejection(
    rejection: PromiseRejectionEvent,
  ): void;

  public createEventFromError(error: Error, ...extraInfo: any[]): any {
    // extraInfo ( 플랫폼 별로 특화된 정보 )
    const event = extraInfo.reduce((acc, info) => {
      return { ...acc, ...info };
    }, {});

    event.contexts = this.contexts;

    // 공통 정보 1
    event.timeStamp = new Date();
    event.platform = this.platform;
    event.sdk = this.sdk;

    // Error 정보
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

    // 옵션
    event.environment = 'production';
    if (this.options.release) {
      event.release = this.options.release;
    }

    if (this.options.environment) {
      event.environment = this.options.environment;
    }

    return event;
  }

  public sendEvent(event: Event): void {
    // traceSampleRate option
    if (
      this.options.traceSampleRate &&
      Math.random() > this.options.traceSampleRate
    ) {
      return;
    }
    console.log(event);
    this.request.post('/', event);
  }

  public setContext(title: string, content: any): void {
    this.contexts[title] = content;
  }
}
