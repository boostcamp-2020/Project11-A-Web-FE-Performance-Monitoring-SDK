import os from 'os';

export const nodeInfo = (): any => {
  const event: any = {};
  event.runtime = process.version;
  event.serverName = os.hostname();
  return event;
};
