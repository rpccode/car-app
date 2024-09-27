import { createReducer, on } from '@ngrx/store';

import { User } from 'src/app/models/user.model';
import { loginFailure, loginSuccess, logout } from '../actions/auth.actions';

export interface AuthState {
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, (state) => ({ ...state, user: null, error: null }))
);
