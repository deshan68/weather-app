import type {
  SearchLocation,
  WeatherAlert,
  WeatherData,
} from "@/types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

class WeatherApi {
  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    // Add API key and other parameters
    url.searchParams.append("key", API_KEY);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
          `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  async getCurrentWeather(query: string): Promise<WeatherData> {
    return this.makeRequest<WeatherData>("/current.json", { q: query });
  }

  async getForecast(query: string, days: number = 5): Promise<WeatherData> {
    return this.makeRequest<WeatherData>("/forecast.json", {
      q: query,
      days: days.toString(),
      aqi: "yes",
      alerts: "yes",
    });
  }

  async searchLocations(query: string): Promise<SearchLocation[]> {
    if (query.length < 3) return [];
    return this.makeRequest<SearchLocation[]>("/search.json", { q: query });
  }

  async getAlerts(query: string): Promise<WeatherAlert[]> {
    try {
      const data = await this.makeRequest<{
        alerts: { alert: WeatherAlert[] };
      }>("/current.json", {
        q: query,
        alerts: "yes",
      });
      return data.alerts?.alert || [];
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      return [];
    }
  }

  async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }
}

export const weatherApi = new WeatherApi();
