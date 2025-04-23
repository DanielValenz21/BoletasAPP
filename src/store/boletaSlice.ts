import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';

export interface Boleta {
  id: number;
  numeroPlaca: string;
  nombres: string;
  apellidos: string;
  monto: number;
  fechaInfraccion: string;          // ← por si luego la quieras mostrar
}

interface State {
  list: Boleta[];
  loading: boolean;
  error: string | null;
}
const initial: State = { list: [], loading: false, error: null };

export const fetchBoletas = createAsyncThunk<Boleta[], void, { rejectValue:string }>(
  'boletas/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.get('/boletas');
      return data as Boleta[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error ?? err.message ?? 'Error al obtener boletas',
      );
    }
  },
);

const slice = createSlice({
  name: 'boletas',
  initialState: initial,
  reducers: { clear: s => { s.list = []; } },
  extraReducers: b => {
    b.addCase(fetchBoletas.pending,  s => { s.loading = true;  s.error = null; });
    b.addCase(fetchBoletas.rejected, (s,a)=>{ s.loading = false; s.error = a.payload ?? 'Error'; });
    b.addCase(fetchBoletas.fulfilled,(s,a)=>{ s.loading = false; s.list = a.payload; });
  },
});

export const { clear } = slice.actions;
export default slice.reducer;