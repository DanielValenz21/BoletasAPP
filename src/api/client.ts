import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',   // ⚠️ cambia por tu IP real si pruebas en dispositivo
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export default client;
