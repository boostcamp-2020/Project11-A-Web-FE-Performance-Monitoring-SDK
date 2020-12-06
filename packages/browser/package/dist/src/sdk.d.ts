import { Options, Message, Dsn, ContextTitle, Context } from '@santry/types';
export declare const init: (dsn: Dsn, options: Options) => void;
export declare const captureError: (error: Error) => void;
export declare const captureMessage: (message: Message) => void;
export declare const setContext: (title: ContextTitle, context: Context) => void;
export declare const setLevel: (level: string) => void;
