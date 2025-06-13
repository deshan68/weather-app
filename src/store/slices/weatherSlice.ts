import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  type SearchLocation,
  type TemperatureUnit,
  type WeatherAlert,
  type WeatherData,
  type WeatherState,
} from "@/types/weather";
import { weatherApi } from "@/services/weatherApi";

const initialState: WeatherState = {
  currentWeather: null,
  searchResults: [],
  isLoading: false,
  isSearching: false,
  error: null,
  temperatureUnit: "celsius",
  alerts: [],
};

// Async thunks
export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await weatherApi.getCurrentWeather(query);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch weather data"
      );
    }
  }
);

export const fetchWeatherForecast = createAsyncThunk(
  "weather/fetchWeatherForecast",
  async (
    { query, days }: { query: string; days?: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await weatherApi.getForecast(query, days);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch forecast data"
      );
    }
  }
);

export const searchLocations = createAsyncThunk(
  "weather/searchLocations",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await weatherApi.searchLocations(query);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to search locations"
      );
    }
  }
);

export const fetchWeatherAlerts = createAsyncThunk(
  "weather/fetchWeatherAlerts",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await weatherApi.getAlerts(query);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch alerts"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch current weather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentWeather.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.isLoading = false;
          state.currentWeather = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch weather forecast
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherForecast.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.isLoading = false;
          state.currentWeather = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Search locations
      .addCase(searchLocations.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(
        searchLocations.fulfilled,
        (state, action: PayloadAction<SearchLocation[]>) => {
          state.searchResults = action.payload;
          state.isSearching = false;
          state.error = null;
        }
      )
      .addCase(searchLocations.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isSearching = false;
        state.searchResults = [];
      })

      // Fetch weather alerts
      .addCase(
        fetchWeatherAlerts.fulfilled,
        (state, action: PayloadAction<WeatherAlert[]>) => {
          state.alerts = action.payload;
        }
      );
  },
});

export const { setTemperatureUnit, clearSearchResults, clearError } =
  weatherSlice.actions;

export default weatherSlice.reducer;
