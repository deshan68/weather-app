import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { weatherApi } from "@/services/weatherApi";

type CityIconMap = Record<string, string>;

export function usePinnedCityIcons() {
  const { pinnedCityNames, citiesByName } = useAppSelector(
    (state) => state.cityPreferences
  );
  const [icons, setIcons] = useState<CityIconMap>({});

  useEffect(() => {
    async function fetchIcons() {
      const results: CityIconMap = {};

      await Promise.all(
        pinnedCityNames.map(async (name) => {
          const city = citiesByName[name];
          if (!city) return;

          try {
            const res = await weatherApi.getCurrentWeather(
              `${city.lat},${city.lon}`
            );
            const iconUrl = res.current?.condition?.icon;
            results[name] = `https:${iconUrl}`;
          } catch (error) {
            console.error("Failed to fetch icon for:", error, city.name);
          }
        })
      );

      setIcons(results);
    }

    fetchIcons();
  }, [pinnedCityNames, citiesByName]);

  return icons;
}
