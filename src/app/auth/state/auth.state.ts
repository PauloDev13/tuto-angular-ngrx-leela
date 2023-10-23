import { UserModel } from '../../models/user.model';

export interface AuthState {
  user: UserModel | null;
  redirect: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  redirect: false,
};
