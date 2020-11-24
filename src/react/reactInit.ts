import { BaseInit, InitOptions } from '../baseInit';

class ReactInit extends BaseInit {
  public constructor(options: InitOptions) {
    super(options);
  }
}

export let Santry;

export const SantryInit = (options: InitOptions) => {
  Santry = new ReactInit(options);
};
