// src/utils/parseBoleta.ts
import type {BoletaDraft} from '../api/boletaApi';

/**
 * Recibe el texto plano completo que devuelve el OCR y
 * devuelve un objeto BoletaDraft.  Usa RegEx simples;
 * ajusta las reglas si tu boleta cambia de formato.
 */
export function parseBoleta(text: string): Partial<BoletaDraft> {
  const g = (re: RegExp) => (text.match(re)?.[1] ?? '').trim();

  return {
    numeroPlaca:        g(/No\. Placa[:\s]*([A-Z0-9-]+)/i),
    tarjetaCirculacion: g(/Tarjeta\s*No[:\s]*([A-Z0-9-]+)/i),
    nit:                g(/NIT[:\s]*([0-9-]+)/i),
    tipoVehiculo:       g(/Tipo Vehiculo[:\s]*([A-Za-z]+)/i),
    marca:              g(/Marca[:\s]*([A-Za-z]+)/i),
    color:              g(/Color[:\s]*([A-Za-z]+)/i),

    nombres:            g(/Nombres?\s*([A-Za-zÁÉÍÓÚÑ\s]+)/i),
    apellidos:          g(/Apellidos?\s*([A-Za-zÁÉÍÓÚÑ\s]+)/i),
    licencia:           g(/Licencia[:\s]*([A-Z0-9-]+)/i),
    tipoLicencia:       g(/Tipo de Licencia\s*([A-Z])/i),
    genero:             g(/G[eé]nero[:\s]*(M|F)/i),

    articuloInfringido: g(/Artículo Infringido[:\s]*([0-9A-Z-]+)/i),
    monto:              +(g(/Monto.*?\$?\s*([0-9.]+)/i) || 0),
    baseLegal:          g(/Base Legal[:\s]*([A-Za-z0-9\s]+)/i),
    lugarInfraccion:    g(/Lugar de la Infracci[oó]n[:\s]*([A-Za-z0-9\s]+)/i),
    fechaInfraccion:    g(/Fecha de la Infracci[oó]n[:\s]*([0-9/]+)/i)
                          .split('/').reverse().join('-'), // 10/04/2025 → 2025-04-10
    horaInfraccion:     g(/Hora de la Infracci[oó]n[:\s]*([0-9:]+)/i),
    observaciones:      g(/OBSERVACIONES[:\s]*([\s\S]+)/i).split('\n')[0],

    numeroAgente:       g(/No de Identificaci[oó]n[:\s]*([0-9A-Z-]+)/i),
  };
}
