import type { Store } from '@reduxjs/toolkit';
import client         from './client';
import type { RootState } from '../store';

export function setupInterceptors(store: Store<RootState>) {
  client.interceptors.request.use(
    cfg => {
      const token = store.getState().auth.token;
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
      return cfg;
    },
    error => Promise.reject(error),
  );
}
