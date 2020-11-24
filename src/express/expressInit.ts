import { BaseInit, InitOptions } from '../baseInit';
import { SDK_NAME, SDK_VERSION } from './version';
import { Event } from '../type';

class ExpressInit extends BaseInit {
  public constructor(options: InitOptions) {
    super(options);
  }

  /*
  public async captureException(error: Error) {
    const data = {
      error,
      node: process.version,
      platform: process.platform,
    };
    return super.captureException(data);
  }
*/
  public errorHandler = () => {
    return function middleware(err, req: Request, res, next) {
      const data = {
        err,
        header: req.headers,
      };
      console.log('mine=================');
      console.log(data);
      next();
    };
  };
}

export let Santry;

export const SantryInit = (options: InitOptions) => {
  Santry = new ExpressInit(options);
};
