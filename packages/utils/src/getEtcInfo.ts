import { Event } from '@santry/types';
import os from 'os';

export const getNodeEtcInfo = (): Event => {
  const event: Event = {};
  event.runtime = process.version;
  event.serverName = os.hostname();
  return event;
};
