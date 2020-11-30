import { SantryGlobalObject } from '@santry/types';

export const getGlobalObject = <T>(): T & SantryGlobalObject => {
  return (typeof global !== undefined
    ? global
    : typeof window !== undefined
    ? window
    : {}) as T & SantryGlobalObject;
};
