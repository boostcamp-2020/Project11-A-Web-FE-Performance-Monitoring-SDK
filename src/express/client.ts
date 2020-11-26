import axios, { AxiosInstance } from 'axios';

interface Options {
  projectId: number;
  token: string;
  baseAxios?: AxiosInstance;
  sdk?: {
    version: string;
    name: string;
  };
  platform?: string;
}

const ExpressClient = (options: Options): Options => {
  const expressAxios = axios.create({
    baseURL: `/express/${options.projectId}`,
    headers: { Authorization: `Bearer ${options.token}` },
  });

  return {
    ...options,
    baseAxios: expressAxios,
    sdk: {
      version: '0.1.0',
      name: 'express',
    },
    platform: 'express',
  };
};

export default ExpressClient;
