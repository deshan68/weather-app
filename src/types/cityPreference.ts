export interface FavoriteCity {
  name: string;
}
export interface PinnedCity {
  name: string;
  icon: string;
  lat: number;
  lon: number;
}

export interface CityPreferencesState {
  favoriteCities: FavoriteCity[];
  pinnedCities: PinnedCity[];
}
