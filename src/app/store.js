import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import loadingReducer from './slices/loadingSlice';
import currencyRateReducer from './slices/currencyRateSlice';
import userReducer from './slices/userSlice';
import transactionSlice from './slices/transactionSlice';
import popupSlice from './slices/popupSlice';

const reducers = combineReducers({
  loading: loadingReducer,
  currencyRate: currencyRateReducer,
  user: userReducer,
  transaction: transactionSlice,
  popup: popupSlice
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'transaction', 'popup'] // define non persist state
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
