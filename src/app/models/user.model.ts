export class UserModel {
  constructor(
    readonly email: string,
    readonly token: string,
    readonly localId: string,
    readonly expirationDate: Date,
  ) {}
}

export class AuthResponseFail {
  constructor(
    private code: number,
    private message: string,
  ) {}
}
