export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface CityPreferencesState {
  citiesByName: Record<string, City>;
  favoriteCityNames: string[];
  pinnedCityNames: string[];
}
