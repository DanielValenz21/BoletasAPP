// src/api/boletaApi.ts
import client from './client';

/** 1 : 1 con el backend */
export interface Boleta {
  id: number;
  numeroPlaca: string;
  tarjetaCirculacion: string;
  nit: string;
  tipoVehiculo: string;
  marca: string;
  color: string;
  nombres: string;
  apellidos: string;
  licencia: string;
  tipoLicencia: string;
  genero: string;
  articuloInfringido: string;
  monto: number;
  baseLegal: string;
  lugarInfraccion: string;
  fechaInfraccion: string;
  horaInfraccion: string;
  observaciones: string;
  numeroAgente: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
}

/** GET /api/boletas */
export async function getBoletas(): Promise<Boleta[]> {
  const {data} = await client.get<Boleta[]>('/boletas');
  return data;
}

/** POST /api/boletas  – crea una multa */
export type BoletaDraft = Omit<Boleta,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy'>;

export async function createBoleta(body: BoletaDraft) {
  const {data} = await client.post('/boletas', body);
  return data;          // backend responde { message, id, … }
}
