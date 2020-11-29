import { Santry } from '@santry/types';

interface SantryGlobalObject {
  santry: {
    dsn?: string;
    hub?: Santry;
  };
}

export const getGlobalObject = <T>(): T & SantryGlobalObject => {
  return (typeof global !== undefined
    ? global
    : typeof window !== undefined
    ? window
    : {}) as T & SantryGlobalObject;
};
