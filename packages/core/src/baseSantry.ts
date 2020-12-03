import { Event, Options, Sdk, Level } from '@santry/types';
import * as ErrorStackParser from 'error-stack-parser';
import { parseDsn } from '@santry/utils';
import axios from 'axios';

export abstract class BaseSantry {
  private readonly options?: Options;
  private readonly request;
  private contexts;
  private level;
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
  protected abstract captureMessage(content: string): void;
  public abstract handleUncaughtError(error: Error): void;
  public abstract handleUncaughtRejection(
    rejection: PromiseRejectionEvent,
  ): void;

  public createEvent(content: Error | string, ...extraInfo: any[]): any {
    // extraInfo ( 플랫폼 별로 특화된 정보 )
    const event = extraInfo.reduce((acc, info) => {
      return { ...acc, ...info };
    }, {});

    event.contexts = this.contexts;
    event.level = this.level;
    // 공통 정보 1
    event.timeStamp = new Date();
    event.platform = this.platform;
    event.sdk = this.sdk;

    event.level = this.level;

    // 메시지인 경우
    if (typeof content === 'string') {
      event.message = content;
      if (!event.level) event.level = 'info';
    }

    // Error 정보
    else {
      if (!event.level) event.level = 'error';
      const parsedStackList = ErrorStackParser.parse(content);
      event.type = content.name;
      event.value = content.message;
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
  public setLevel(level: string): void {
    if (Level.has(level)) this.level = level;
  }
}
