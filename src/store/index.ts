import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';

import auth from './authSlice';

const rootReducer = combineReducers({ auth });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],           // solo persistimos auth
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefault => getDefault({
    serializableCheck: {         // ignorar acciones redux‑persist
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
