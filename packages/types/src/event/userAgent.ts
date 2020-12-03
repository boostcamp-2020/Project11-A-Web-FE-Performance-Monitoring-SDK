export type UserAgentVersion = string;
export type UserAgentName = string;

export interface Os {
  version: UserAgentVersion;
  name: UserAgentName;
}

export interface Browser {
  version: UserAgentVersion;
  name: UserAgentName;
}
