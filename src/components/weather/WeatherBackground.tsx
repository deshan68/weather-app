import {
  conditionCodeToVideoKey,
  weatherVideoMap,
} from "@/assets/backgroundVideos";
import { useAppSelector } from "@/hooks/useRedux";

const WeatherBackground = () => {
  const { currentWeather } = useAppSelector((state) => state.weather);
  const conditionCode = currentWeather?.current.condition.code;
  const localtime = currentWeather?.location.localtime;

  const isNightTime = () => {
    if (!localtime) return false;
    const hour = new Date(localtime).getHours();
    return hour < 6 || hour >= 18;
  };

  if (!conditionCode) {
    return null;
  }

  let videoKey = conditionCodeToVideoKey[conditionCode] || "Clear";

  if (isNightTime() && ["Clear", "PartlyCloudy"].includes(videoKey)) {
    videoKey = "Night";
  }

  const videoSrc = weatherVideoMap[videoKey];

  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default WeatherBackground;
