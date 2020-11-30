interface DSN {
  token: string;
  url: string;
}

export const parseDsn = (dsn: string): DSN => {
  const dsnRegex = /([^@]+)@(.*)/g;
  const result = dsnRegex.exec(dsn);
  const token = result[1];
  const url = result[2];
  return { token, url };
};
