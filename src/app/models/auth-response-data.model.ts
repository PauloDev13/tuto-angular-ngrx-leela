export interface AuthResponseDataModel {
  localId: string;
  email: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthResponseFailModel {
  code: number;
  message: string;
}
