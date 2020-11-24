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
      baseURL: 'http://101.101.210.34:3000/',
      headers: { Authorization: `Bearer ${this.options.token}` },
      params: {
        id: this.options.projectId,
      },
    });
  }

  public async captureException(error: any) {
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
