export class UserModel {
  private email: string;
  private token: string;
  private localId: string;
  private expirationDate: Date;
  constructor(
    email: string,
    token: string,
    localId: string,
    expirationDate: Date,
  ) {
    this.email = email;
    this.token = token;
    this.localId = localId;
    this.expirationDate = expirationDate;
  }
}

export class AuthResponseFail {
  constructor(
    private code: number,
    private message: string,
  ) {}
}
