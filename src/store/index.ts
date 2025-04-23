import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';

import auth from './authSlice';
import boletas from './boletaSlice';          // 👈 nuevo
import { setupInterceptors } from '../api/setupInterceptors';

/* ---------------- reducers ------------------ */
const rootReducer = combineReducers({
  auth,
  boletas,                                    // 👈 lo añadimos
});

/* ---- persist  (NO guardamos auth) ---------- */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const persisted = persistReducer(persistConfig, rootReducer);

/* ---------------- store --------------------- */
export const store = configureStore({
  reducer: persisted,
  middleware: getDefault => getDefault({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

/* -------- axios + token interceptor --------- */
setupInterceptors(store);

/* --------------- tipos ---------------------- */
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* --------- persistor (otros slices) --------- */
export const persistor = persistStore(store);
