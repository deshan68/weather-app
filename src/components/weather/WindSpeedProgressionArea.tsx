import { useAppSelector } from "@/hooks/useRedux";
import { WindInfoCard } from "./WindInfoCard";
import { UVIndexCard } from "./UVIndexCard";

function WindSpeedProgressionArea() {
  const { currentWeather } = useAppSelector((state) => state.weather);

  if (!currentWeather) return null;

  return (
    <div className="h-full w-full flex flex-col gap-2 justify-between">
      <WindInfoCard
        windDegree={currentWeather!.current.wind_degree}
        windKph={currentWeather!.current.wind_kph}
        windMph={currentWeather!.current.wind_mph}
        gustKph={currentWeather!.current.gust_kph}
        gustMph={currentWeather!.current.gust_mph}
      />
      <UVIndexCard uv={currentWeather!.current.uv} />
    </div>
  );
}

export default WindSpeedProgressionArea;
