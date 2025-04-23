// src/api/boletaApi.ts
import client from './client';

/** Coincide con la interfaz del slice */
export interface Boleta {
  id: number;
  numeroPlaca: string;
  nombres: string;
  apellidos: string;
  monto: number;
  fechaInfraccion: string;
}

/** GET /api/boletas  ── retorna todas las boletas */
export async function getBoletas(): Promise<Boleta[]> {
  const { data } = await client.get<Boleta[]>('/boletas');
  return data;
}
