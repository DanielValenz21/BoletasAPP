import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Cambia la URL base por tu IP local o el túnel que uses (ngrok, localtunnel, etc.) */
const client = axios.create({
  baseURL: 'https://7e0f-181-119-108-43.ngrok-free.app/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

/* → Inyectamos automáticamente el JWT en todos los requests */
client.interceptors.request.use(async cfg => {
  const token = await AsyncStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default client;
