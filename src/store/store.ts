import { configureStore, combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import cityPreferencesReducer from "./slices/cityPreferencesSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const weatherPersistConfig = {
  key: "weather",
  storage,
  whitelist: ["temperatureUnit"],
};

const rootReducer = combineReducers({
  weather: persistReducer(weatherPersistConfig, weatherReducer),
  cityPreferences: cityPreferencesReducer,
});

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cityPreferences"],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
