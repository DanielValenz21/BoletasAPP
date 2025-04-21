import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';

interface LoginPayload { username: string; password: string }
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = { token: null, loading: false, error: null };

export const login = createAsyncThunk<
  string,          // valor devuelto (token)
  LoginPayload,    // argumentos
  { rejectValue: string }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data } = await client.post('/auth/login', body);
    return data.token as string;
  } catch (err: any) {
    const msg =
      err.response?.data?.error ??
      err.message ??
      'Error de red';
    return rejectWithValue(msg);
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => { state.token = null; }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending,  s => { s.loading = true;  s.error = null; })
      .addCase(login.rejected, (s,a)=>{ s.loading = false; s.error = a.payload ?? 'Error'; })
      .addCase(login.fulfilled,(s,a)=>{ s.loading = false; s.token = a.payload; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
