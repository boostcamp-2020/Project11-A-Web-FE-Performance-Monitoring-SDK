import {
  Options,
  Contexts,
  Platform,
  Sdk,
  Message,
  ContextTitle,
  Context,
  Dsn,
  Level,
  Event,
} from '@santry/types';
import { parseDsn, parseErrorStack } from '@santry/utils';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class BaseSantry {
  private readonly options?: Options;
  private readonly request: AxiosInstance;
  private contexts: Contexts;
  private level: string;
  protected platform: Platform;
  protected sdk: Sdk;

  public constructor(dsn: Dsn, options: Options = {}) {
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
    this.onUncaughtException();
    this.onUnhandledRejection();
  }

  protected abstract captureError(error: Error): void;
  protected abstract captureMessage(message: Message): void;
  public abstract onUncaughtException(): void;
  public abstract onUnhandledRejection(): void;

  public createEvent(
    content: Error | Message,
    ...extraInfo: Record<string, any>[]
  ): void {
    // extraInfo ( 플랫폼 별로 특화된 정보 )
    const event: Event = extraInfo.reduce((acc, info) => {
      return { ...acc, ...info };
    }, {});

    event.contexts = this.contexts;
    event.level = this.level;
    // 공통 정보 1
    event.timeStamp = new Date();
    event.platform = this.platform;
    event.sdk = this.sdk;

    // 메시지인 경우
    if (typeof content === 'string') {
      event.message = content;
      if (!event.level) event.level = 'info';
    }

    // Error 정보
    else {
      if (!event.level) event.level = 'error';
      event.error = parseErrorStack(content);
    }

    // 옵션
    event.environment = 'production';
    if (this.options.release) {
      event.release = this.options.release;
    }

    if (this.options.environment) {
      event.environment = this.options.environment;
    }

    this.sendEvent(event);
  }

  public async sendEvent(event: any): Promise<number | undefined> {
    try {
      // traceSampleRate option
      if (
        this.options.traceSampleRate &&
        Math.random() > this.options.traceSampleRate
      ) {
        return;
      }
      // console.log(event);
      const response = await this.request.post('/', event);
      return response.status;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  public setContext(title: ContextTitle, context: Context): void {
    this.contexts[title] = context;
  }
  public setLevel(level: string): void {
    if (Level.has(level)) this.level = level;
  }

  public getOptions(): Options {
    return this.options;
  }
}
