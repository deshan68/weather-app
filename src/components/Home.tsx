import { useEffect } from "react";
import { useWeatherData } from "@/hooks/useWeatherData";
import MapArea from "./map/MapArea";
import { DEFAULT_COORDINATE } from "@/lib/constants";
import TemperatureAndUVArea from "./weather/TemperatureAndUVArea";
import Footer from "./Footer";
import WindInfoAndUVInfoArea from "./weather/WindInfoAndUVInfoArea";
import MainWeatherDetailsArea from "./weather/MainWeatherDetailsArea";

const Home = () => {
  const { fetchWeatherByCoordinates } = useWeatherData();
  useEffect(() => {
    fetchWeatherByCoordinates(DEFAULT_COORDINATE[0], DEFAULT_COORDINATE[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full gap-2 flex-col">
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <div className="w-full md:w-2/3 -z-10">
          <MainWeatherDetailsArea />
        </div>

        <div className="flex w-full md:w-1/3 -z-10">
          <WindInfoAndUVInfoArea />
        </div>
      </div>

      <div className="flex w-full gap-2 flex-col-reverse md:flex-row">
        <div className="w-full md:w-2/3">
          <MapArea />
        </div>
        <div className="flex w-full md:w-1/3">
          <TemperatureAndUVArea />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
