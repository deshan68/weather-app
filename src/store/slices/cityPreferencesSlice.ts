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
      const exists = state.favoriteCities.find(
        (city) => city.name === action.payload.name
      );

      if (!exists) {
        const newCity: FavoriteCity = {
          name: action.payload.name,
          lat: action.payload.lat,
          lon: action.payload.lon,
        };
        state.favoriteCities.push(newCity);

        toast.success("City added to favorites", {
          description: `${newCity.name} has been added to your favorite cities.`,
          duration: 4000,
          position: "bottom-center",
        });
      } else {
        toast("Already a favorite", {
          description: `${action.payload.name} is already in your favorite list.`,
          duration: 3000,
          position: "bottom-center",
        });
      }
    },

    removeFavoriteCity(state, action: PayloadAction<string>) {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city.name !== action.payload
      );

      toast("Favorite removed", {
        description: `${action.payload} has been removed from your favorite cities.`,
        duration: 4000,
        position: "bottom-center",
      });
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
        state.pinnedCities.push(newCity);

        toast.success("City pinned", {
          description: `${newCity.name} has been added to your pinned cities.`,
          duration: 4000,
          position: "bottom-center",
        });
      } else {
        toast("Already pinned", {
          description: `${action.payload.name} is already pinned.`,
          duration: 3000,
          position: "bottom-center",
        });
      }
    },

    removePinnedCity(state, action: PayloadAction<string>) {
      state.pinnedCities = state.pinnedCities.filter(
        (city) => city.name !== action.payload
      );

      toast("City unpinned", {
        description: `${action.payload} has been removed from your pinned cities.`,
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
