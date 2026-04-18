export interface AuthState {
  isLoggedIn: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  error: null,
  successMessage: null,
};
