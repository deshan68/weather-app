import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherForecast,
  searchLocations,
} from "@/store/slices/weatherSlice";
import type { AppDispatch, RootState } from "@/store/store";

export const useWeatherData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, isLoading, error, temperatureUnit } = useSelector(
    (state: RootState) => state.weather
  );

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    const query = `${lat},${lon}`;
    try {
      await dispatch(fetchWeatherForecast({ query })).unwrap();
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const searchWeatherLocations = async (searchQuery: string) => {
    try {
      await dispatch(searchLocations(searchQuery)).unwrap();
    } catch (error) {
      console.error("Failed to search locations:", error);
    }
  };

  return {
    currentWeather,
    isLoading,
    error,
    temperatureUnit,
    fetchWeatherByCoordinates,
    searchWeatherLocations,
  };
};
