import { useAppSelector } from "@/hooks/useRedux";
import UVIndexCard from "./UVIndexCard";
import WindInfoCard from "./WindInfoCard";

const WindInfoAndUVInfoArea = () => {
  const { currentWeather, isLoading } = useAppSelector(
    (state) => state.weather
  );

  return (
    <div className="h-full w-full flex flex-col gap-2 justify-between">
      <WindInfoCard
        windDegree={currentWeather?.current.wind_degree}
        windKph={currentWeather?.current.wind_kph}
        windMph={currentWeather?.current.wind_mph}
        gustKph={currentWeather?.current.gust_kph}
        gustMph={currentWeather?.current.gust_mph}
        isLoading={isLoading}
      />
      <UVIndexCard uv={currentWeather?.current.uv} isLoading={isLoading} />
    </div>
  );
};

export default WindInfoAndUVInfoArea;
