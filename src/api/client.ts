import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',   // cámbialo por tu IP/LAN si es un dispositivo
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export default client;
