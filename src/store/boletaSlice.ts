import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getBoletas, createBoleta, Boleta } from '../api/boletaApi';

interface State {
  list: Boleta[];
  loading: boolean;
  error: string | null;
}
const initialState: State = { list: [], loading: false, error: null };

/* --- GET ---------------------------------------------------------------- */
export const fetchBoletas = createAsyncThunk<
  Boleta[],
  void,
  { rejectValue: string }
>('boletas/fetch', async (_, { rejectWithValue }) => {
  try {
    return await getBoletas();
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error ?? err.message);
  }
});

/* --- POST --------------------------------------------------------------- */
export const submitBoleta = createAsyncThunk<
  { message: string; boletaId: number },
  Omit<Boleta, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>,
  { rejectValue: string }
>('boletas/create', async (body, { rejectWithValue }) => {
  try {
    return await createBoleta(body);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error ?? err.message);
  }
});

const boletaSlice = createSlice({
  name: 'boletas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    /* list */
    builder
      .addCase(fetchBoletas.pending, s => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchBoletas.fulfilled, (s, a: PayloadAction<Boleta[]>) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchBoletas.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? 'Error al cargar boletas';
      });
    /* create */
    builder
      .addCase(submitBoleta.pending, s => {
        s.loading = true;
      })
      .addCase(submitBoleta.fulfilled, s => {
        s.loading = false;
      })
      .addCase(submitBoleta.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? 'Error al crear boleta';
      });
  },
});

export default boletaSlice.reducer;
/*  ←  ¡exportamos el tipo para que MainScreen lo use sin error! */
export type { Boleta };
