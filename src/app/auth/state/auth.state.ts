import { UserModel } from '../../models/user.model';

export interface AuthState {
  user: UserModel | null;
}

export const initialAuthState: AuthState = {
  user: null,
};
