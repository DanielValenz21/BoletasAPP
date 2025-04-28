// src/api/client.ts
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://7985-181-119-108-43.ngrok-free.app/api',  
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export default client;
