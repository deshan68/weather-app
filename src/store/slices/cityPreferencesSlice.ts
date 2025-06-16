import type { City, CityPreferencesState } from "@/types/cityPreference";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: CityPreferencesState = {
  citiesByName: {},
  favoriteCityNames: [],
  pinnedCityNames: [],
};

const cityPreferencesSlice = createSlice({
  name: "cityPreferences",
  initialState,
  reducers: {
    addFavoriteCity(state, action: PayloadAction<City>) {
      const { name } = action.payload;

      if (!state.favoriteCityNames.includes(name)) {
        state.favoriteCityNames.push(name);
        state.citiesByName[name] = action.payload;

        toast.success("City added to favorites", {
          description: `${name} has been added to your favorite cities.`,
          duration: 4000,
          position: "bottom-center",
        });
      } else {
        toast("Already a favorite", {
          description: `${name} is already in your favorite list.`,
          duration: 3000,
          position: "bottom-center",
        });
      }
    },

    removeFavoriteCity(state, action: PayloadAction<string>) {
      const name = action.payload;
      state.favoriteCityNames = state.favoriteCityNames.filter(
        (n) => n !== name
      );

      toast("Favorite removed", {
        description: `${name} has been removed from your favorite cities.`,
        duration: 4000,
        position: "bottom-center",
      });

      // Optionally remove city data if it's not referenced anymore
      if (!state.pinnedCityNames.includes(name)) {
        delete state.citiesByName[name];
      }
    },

    addPinnedCity(state, action: PayloadAction<City>) {
      const { name } = action.payload;

      if (!state.pinnedCityNames.includes(name)) {
        state.pinnedCityNames.push(name);
        state.citiesByName[name] = action.payload;

        toast.success("City pinned", {
          description: `${name} has been pinned.`,
          duration: 4000,
          position: "bottom-center",
        });
      } else {
        toast("Already pinned", {
          description: `${name} is already pinned.`,
          duration: 3000,
          position: "bottom-center",
        });
      }
    },

    removePinnedCity(state, action: PayloadAction<string>) {
      const name = action.payload;
      state.pinnedCityNames = state.pinnedCityNames.filter((n) => n !== name);

      toast("City unpinned", {
        description: `${name} has been removed from your pinned cities.`,
        duration: 4000,
        position: "bottom-center",
      });

      // Optionally remove city data if it's not referenced anymore
      if (!state.favoriteCityNames.includes(name)) {
        delete state.citiesByName[name];
      }
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
