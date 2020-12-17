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
  Santry,
} from '@santry/types';
import { parseDsn, getErrorInfo } from '@santry/utils';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class BaseSantry implements Santry {
  protected readonly options?: Options;
  protected platform: Platform;
  protected sdk: Sdk;
  private readonly request: AxiosInstance;
  private contexts: Contexts;

  protected constructor(dsn: Dsn, options: Options = {}) {
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

  public abstract captureError(error: Error, level: string): void;
  public abstract captureMessage(message: Message, level: string): void;
  protected abstract onUncaughtException(): void;
  protected abstract onUnhandledRejection(): void;

  public createEvent(
    content: Error | Message,
    ...extraInfo: Record<string, any>[]
  ): void {
    // extraInfo ( 플랫폼 별로 특화된 정보 )
    const event: Event = extraInfo.reduce((acc, info) => {
      return { ...acc, ...info };
    }, {});

    event.contexts = this.contexts;
    // 공통 정보 1
    event.timeStamp = new Date();
    event.platform = this.platform;
    event.sdk = this.sdk;

    // 메시지인 경우
    if (typeof content === 'string') {
      event.message = content;
    }

    // Error 정보
    else {
      event.error = { ...event.error, ...getErrorInfo(content) };
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

  private async sendEvent(event: Event): Promise<number | undefined> {
    try {
      // traceSampleRate option
      if (
        this.options.traceSampleRate &&
        Math.random() > this.options.traceSampleRate
      ) {
        return;
      }
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
}
