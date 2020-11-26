import { Santry } from './baseSantry';
import { initWithClass } from './initWithClass';
import { VanillaSantry } from './VanillaSantry';

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

export const init = {
  vanilla: (dsn: string): void => initWithClass(VanillaSantry, dsn),
};

export const captureError = (error: Error): void => {
  const { santry } = getGlobalObject<Window>();
  santry.hub.captureError(error);
};

// export const captureMessage = (message, level) => {
//   const { santry } = getGlobalObject();
//   santry.hub.captureMessage(message, level);
// };
