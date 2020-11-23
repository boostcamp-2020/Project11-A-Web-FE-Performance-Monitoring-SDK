export interface Event {
  timeStamp: Date;
  createdBy?: User;
  os: Os;
  browser?: Browser;
  platform: string;
  sdk: Sdk;
}

export interface Sdk {
  version: string;
  name: string;
}

export interface Client {
  id: number;
  email: string;
  projectIds: number[];
}

export interface User {
  ipAdress: string;
  email: string;
}

export interface Os {
  version: string;
  name: string;
}

export interface Browser {
  version: string;
  name: string;
}
