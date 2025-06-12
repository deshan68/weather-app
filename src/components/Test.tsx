import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchCurrentWeather } from "@/store/slices/weatherSlice";
import { useEffect } from "react";

function Test() {
  const dispatch = useAppDispatch();

  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );

  useEffect(() => {
    dispatch(fetchCurrentWeather("London"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Current Weather</h1>
      <p>Location: {currentWeather.location.name}</p>
      <p>Temperature: {currentWeather.current.temp_c} °C</p>
      <p>Condition: {currentWeather.current.condition.text}</p>
      <img src={currentWeather.current.condition.icon} alt="Weather Icon" />
      <p>
        Last Updated:{" "}
        {new Date(currentWeather.current.last_updated).toLocaleString()}
      </p>
      <p>Wind: {currentWeather.current.wind_kph} kph</p>
      <p>Humidity: {currentWeather.current.humidity}%</p>
    </div>
  );
}

export default Test;
