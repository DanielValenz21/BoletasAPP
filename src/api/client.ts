import axios from 'axios';
import store from '../store';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',      // ⚠️ en dispositivo físico usa tu IP
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ── interceptor para inyectar el token ──────────────────────────────
client.interceptors.request.use(cfg => {
  const token = store.getState().auth.token;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default client;
