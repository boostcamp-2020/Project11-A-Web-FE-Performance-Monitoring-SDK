import ExpressClient from './client';
import { Options } from '../type';

interface globalSantry extends NodeJS.Global {
  santry?: {
    options: Options;
  };
}

const expressSantry: globalSantry = global;

export const getExpressSantry = () => {
  return expressSantry;
};

export const init = (options) => {
  const client = ExpressClient(options);
  expressSantry.santry.options = client;
};

export { errorHandler } from './errorHandler';
