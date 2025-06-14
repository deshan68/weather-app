import { useDispatch, useSelector } from "react-redux";
import { weatherApi } from "../services/weatherApi";
import { fetchWeatherForecast } from "@/store/slices/weatherSlice";
import type { AppDispatch, RootState } from "@/store/store";

export const useWeatherData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, isLoading, error, temperatureUnit } = useSelector(
    (state: RootState) => state.weather
  );

  const fetchWeatherByLocation = async (query: string, days?: number) => {
    try {
      await dispatch(fetchWeatherForecast({ query, days })).unwrap();
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
      await fetchWeatherByLocation("Colombo");
    }
  };

  const getHistoricalWeather = async (query: string, date: string) => {
    try {
      const response = await weatherApi.getHistoricalWeather(query, date);
      return response;
    } catch (error) {
      console.error("Failed to fetch historical weather data:", error);
      throw error;
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
    getHistoricalWeather,
  };
};
