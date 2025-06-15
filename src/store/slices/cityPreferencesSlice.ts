import type {
  CityPreferencesState,
  FavoriteCity,
  PinnedCity,
} from "@/types/cityPreference";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: CityPreferencesState = {
  favoriteCities: [],
  pinnedCities: [],
};

const cityPreferencesSlice = createSlice({
  name: "cityPreferences",
  initialState,
  reducers: {
    addFavoriteCity(state, action: PayloadAction<FavoriteCity>) {
      if (
        !state.favoriteCities.find((city) => city.name === action.payload.name)
      ) {
        const newCity: FavoriteCity = {
          name: action.payload.name,
        };
        const updatedList = [...state.favoriteCities, newCity];
        state.favoriteCities = updatedList;
      }
    },
    removeFavoriteCity(state, action: PayloadAction<string>) {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city.name !== action.payload
      );
    },
    addPinnedCity(state, action: PayloadAction<PinnedCity>) {
      if (
        !state.pinnedCities.find((city) => city.name === action.payload.name)
      ) {
        const newCity: PinnedCity = {
          name: action.payload.name,
          icon: action.payload.icon,
          lat: action.payload.lat,
          lon: action.payload.lon,
        };
        const updatedList = [...state.pinnedCities, newCity];
        state.pinnedCities = updatedList;
        toast.success("City pinned", {
          description: `${newCity.name} has been added to your pinned cities.`,
          duration: 4000,
          position: "bottom-center",
        });
      }
    },
    removePinnedCity(state, action: PayloadAction<string>) {
      state.pinnedCities = state.pinnedCities.filter(
        (city) => city.name !== action.payload
      );
      toast("City unpinned", {
        description: `${name} has been removed from your pinned cities.`,
        duration: 4000,
        position: "bottom-center",
      });
    },
  },
});

export const {
  addFavoriteCity,
  removeFavoriteCity,
  addPinnedCity,
  removePinnedCity,
} = cityPreferencesSlice.actions;

export default cityPreferencesSlice.reducer;
