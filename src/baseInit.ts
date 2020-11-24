import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface InitOptions {
  projectId: number;
  token: string;
}

export const baseInit = (options: InitOptions) => {
  const baseAxios = axios.create({
    baseURL: 'http://101.101.210.34:3000',
    headers: { Authorization: `Bearer ${options.token}` },
    // params: {
    //   id: options.projectId,
    // },
  });
  return baseAxios;
};

export const captureException = async (data: any, baseAxios: AxiosInstance) => {
  try {
    const eventId = await baseAxios.post('/error', {
      first: data.message,
      second: data.name,
      third: data.stack,
    });

    return eventId;
  } catch (e) {
    console.log('capture error');
    console.error(e);
  }
};

export abstract class Client {
  protected readonly options: InitOptions;
  protected constructor(options: InitOptions) {
    this.options = options;
  }
}

// export abstract class BaseInit {
//   protected readonly options: InitOptions;
//   protected readonly baseAxios: AxiosInstance;

//   protected constructor(options: InitOptions) {
//     this.options = options;
//     this.baseAxios = axios.create({
//       baseURL: 'http://101.101.210.34:3000/',
//       headers: { Authorization: `Bearer ${this.options.token}` },
//       params: {
//         id: this.options.projectId,
//       },
//     });
//   }

//   public async captureException(error: any) {
//     const eventId: AxiosResponse = await this.baseAxios.post('/error', {
//       data: error,
//     });
//     if (eventId.status !== 200) {
//       throw new Error(eventId.data);
//     }
//     return eventId.data;
//   }

//   public async captureMessage(message: string, type: string = 'default') {
//     const eventId: AxiosResponse = await this.baseAxios.post('/message', {
//       data: message,
//     });
//     if (eventId.status !== 200) {
//       throw new Error(eventId.data);
//     }
//     return eventId.data;
//   }

//   public get option() {
//     return this.options;
//   }
// }
