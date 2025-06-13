import { configureStore, combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import cityPreferencesReducer from "./slices/cityPreferencesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  weather: weatherReducer,
  cityPreferences: cityPreferencesReducer,
});

const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: ["cityPreferences"] },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
