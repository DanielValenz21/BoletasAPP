import client from './client';

export interface Boleta {
  id: number;
  numeroPlaca: string;
  tarjetaCirculacion: string;
  tipoVehiculo: string;
  marca: string;
  color: string;
  nombres: string;
  apellidos: string;
  licencia: string;
  tipoLicencia: string;
  genero: string;
  nit: string | null;
  articuloInfringido: string;
  monto: number;
  baseLegal: string;
  lugarInfraccion: string;
  fechaInfraccion: string;
  horaInfraccion: string;
  observaciones: string | null;
  numeroAgente: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdBy?: number;
}

/** GET /api/boletas */
export async function getBoletas(): Promise<Boleta[]> {
  const { data } = await client.get<Boleta[]>('/boletas');
  return data;
}

/** POST /api/boletas */
export async function createBoleta(
  body: Omit<Boleta, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>
) {
  const { data } = await client.post<{ message: string; boletaId: number }>(
    '/boletas',
    body,
  );
  return data;
}
