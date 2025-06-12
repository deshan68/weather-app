import { useDispatch, useSelector } from "react-redux";
import { weatherApi } from "../services/weatherApi";
import { fetchWeatherForecast } from "@/store/slices/weatherSlice";
import type { AppDispatch, RootState } from "@/store/store";

export const useWeatherData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, isLoading, error, temperatureUnit } = useSelector(
    (state: RootState) => state.weather
  );

  const fetchWeatherByLocation = async (query: string) => {
    try {
      await dispatch(fetchWeatherForecast({ query, days: 5 })).unwrap();
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    const query = `${lat},${lon}`;
    await fetchWeatherByLocation(query);
  };

  const fetchCurrentLocationWeather = async () => {
    try {
      const position = await weatherApi.getCurrentPosition();
      await fetchWeatherByCoordinates(position.latitude, position.longitude);
    } catch (error) {
      console.error("Failed to get current location weather:", error);
      // Fallback to a default location
      await fetchWeatherByLocation("Colombo");
    }
  };

  return {
    currentWeather,
    isLoading,
    error,
    temperatureUnit,
    fetchWeatherByLocation,
    fetchWeatherByCoordinates,
    fetchCurrentLocationWeather,
  };
};
