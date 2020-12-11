export type TraceSampleRate = number;
export type Release = string;
export type Environment = string;

export interface Options {
  traceSampleRate?: TraceSampleRate;
  release?: Release;
  environment?: Environment;
  uncaughtExceptionLevel?: string;
  unhandledRejectionLevel?: string;
}
