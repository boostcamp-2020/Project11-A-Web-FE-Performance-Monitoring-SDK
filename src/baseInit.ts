import axios, { AxiosInstance, AxiosResponse } from 'axios';
import os from 'os';

import { Event } from './type';

export interface InitOptions {
  projectId: number;
  token: string;
}

export abstract class BaseInit {
  protected readonly options: InitOptions;
  protected readonly baseAxios: AxiosInstance;

  protected constructor(options: InitOptions) {
    this.options = options;
    this.baseAxios = axios.create({
      baseURL: 'your backend server URL',
      headers: { Authorization: `Bearer ${this.options.token}` },
      params: {
        id: this.options.projectId,
      },
    });
  }

  protected createEvent(event: Event) {
    event.timeStamp = new Date();
    event.os = {
      version: os.release(),
      name: os.platform(),
    };
    return event;
  }

  public async captureException(error: Error) {
    const eventId: AxiosResponse = await this.baseAxios.post('/error', {
      data: error,
    });
    if (eventId.status !== 200) {
      throw new Error(eventId.data);
    }
    return eventId.data;
  }

  public async captureMessage(message: string, type: string = 'default') {
    const eventId: AxiosResponse = await this.baseAxios.post('/message', {
      data: message,
    });
    if (eventId.status !== 200) {
      throw new Error(eventId.data);
    }
    return eventId.data;
  }

  public get option() {
    return this.options;
  }
}
