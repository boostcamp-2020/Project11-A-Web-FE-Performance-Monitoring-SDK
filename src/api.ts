// to provide url
export default class API {
  public constructor() {}

  public getBaseApiEndPoint(): string {
    return 'serverURL + /api';
  }

  public getStoreEndPoint(): string {
    return `${this.getBaseApiEndPoint()} + /add`;
  }
}
