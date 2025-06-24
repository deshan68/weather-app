export const weatherVideoMap: Record<string, string> = {
  Clear: "/videos/clear.mp4",
  PartlyCloudy: "/videos/partly-cloudy.mp4",
  Cloudy: "/videos/cloudy.mp4",
  Rain: "/videos/rain.mp4",
  Thunderstorm: "/videos/thunderstorm.mp4",
  Snow: "/videos/snow.mp4",
  Fog: "/videos/fog.mp4",
  Wind: "/videos/wind.mp4",
  SunSetSunRise: "/videos/sunset-sunrise.mp4",
  Night: "/videos/night.mp4",
};

export const conditionCodeToVideoKey: Record<
  number,
  keyof typeof weatherVideoMap
> = {
  // Clear / Sunny
  1000: "Clear",

  // Partly Cloudy
  1003: "PartlyCloudy",

  // Cloudy
  1006: "Cloudy",
  1009: "Cloudy",

  // Fog & Mist
  1030: "Fog",
  1135: "Fog",
  1147: "Fog",

  // Light / Moderate Rain
  1063: "Rain",
  1150: "Rain",
  1153: "Rain",
  1168: "Rain",
  1171: "Rain",
  1180: "Rain",
  1183: "Rain",
  1186: "Rain",
  1189: "Rain",
  1192: "Rain",
  1195: "Rain",
  1198: "Rain",
  1201: "Rain",
  1240: "Rain",
  1243: "Rain",
  1246: "Rain",

  // Thunderstorm
  1087: "Thunderstorm",
  1273: "Thunderstorm",
  1276: "Thunderstorm",
  1279: "Thunderstorm",
  1282: "Thunderstorm",

  // Snow
  1066: "Snow",
  1114: "Snow",
  1117: "Snow",
  1204: "Snow",
  1207: "Snow",
  1210: "Snow",
  1213: "Snow",
  1216: "Snow",
  1219: "Snow",
  1222: "Snow",
  1225: "Snow",
  1255: "Snow",
  1258: "Snow",

  // Sleet / Ice / Showers of Ice
  1069: "Snow",
  1072: "Snow",
  1237: "Snow",
  1249: "Snow",
  1252: "Snow",
  1261: "Snow",
  1264: "Snow",

  // Night
  // This one you may handle using local time check — if it's after sunset, map "Clear" → "Night"
  // Otherwise:
  // 1000 (night version): "Night"
  // or apply fallback

  // Optional: Wind & Transition states (if available)
  // Custom handling if needed:
  // "Wind": some logic based on wind speed threshold
  // "SunSetSunRise": based on local time from API (early morning or dusk)
};
