export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  username: '',
};
