import React from "react";

const WeatherInfo = ({ weather }) => {
  return (
    <div className="box_weather_info">
      <h4 className="txt_location">{weather?.name}</h4>
      <h1 className="txt_temperature">
        {weather?.main.temp}°C / {(weather?.main.temp * 1.8 + 32).toFixed(2)}°F
      </h1>
      <h4 className="txt_description">{weather?.weather[0].description}</h4>
    </div>
  );
};

export default WeatherInfo;
