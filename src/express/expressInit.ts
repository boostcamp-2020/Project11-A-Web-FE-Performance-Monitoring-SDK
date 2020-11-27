import { baseInit, InitOptions, captureException, Client } from '../baseInit';
import { AxiosInstance } from 'axios';

interface Santry {
  options?: InitOptions;
  baseAxios?: AxiosInstance;
}

const santry: Santry = {
  options: undefined,
  baseAxios: undefined,
};

export const init = (options: InitOptions) => {
  const expressAxios = baseInit(options);
  expressAxios.defaults.baseURL = expressAxios.defaults.baseURL.concat(
    '/express',
  );
  santry.options = options;
  santry.baseAxios = expressAxios;
};

export const errorHandler = () => {
  const axios = santry.baseAxios;
  return async function errorMiddleware(err, req, res, next) {
    await captureException(err, axios);
    next();
  };
};

class ExpressClient extends Client {
  public constructor(options) {
    super(options);
  }
}

// class ExpressInit extends BaseInit {
//   public constructor(options: InitOptions) {
//     super(options);
//   }
//   public errorHandler = () => {
//     return function middleware(err, req: Request, res, next) {
//       const data = {
//         err,
//         header: req.headers,
//       };
//       super.captureException();
//       console.log('mine=================');
//       console.log(data);
//       next();
//     };
//   };
// }

// export let Santry;

// export const SantryInit = (options: InitOptions) => {
//   Santry = new ExpressInit(options);
// };
