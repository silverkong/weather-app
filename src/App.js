import { useState, useEffect } from "react";
import "./App.css";
import WeatherInfo from "./component/WeatherInfo";
import WeatherButton from "./component/WeatherButton";

import background from "./images/background.jpg";

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보임
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태가 보임
// 3. 5개의 버튼이 있음 (현재 위치, 4개의 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나옴
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 보임
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돎
const weatherAPIKey = process.env.REACT_APP_WEATHER_API;

function App() {
  const [weather, setWeather] = useState(null);
  // 자식에게 줄 state도 app에 지정
  const [city, setCity] = useState("");
  const cities = ["Tokyo", "Berlin", "Moscow", "Seoul"];

  // 현재 위치에 대한 날씨 정보
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  // 선택한 city에 대한 날씨 정보
  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  // useEffect의 배열 안에 아무것도 없으면 componentDidMount : render 하자마자 실행
  // useEffect의 배열 안에 값이 있으면 해당 값이 바뀔 때마다 실행
  useEffect(() => {
    // 현재 위치 가져오고 weather API에 lat, lon 정보 전달
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      });
    };
    // useEffect가 두 개 있으면 두 번 실행되어 오류 발생 > 조건문으로 역할을 다르게 수행
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div className="wrap">
      <img src={background} className="background" alt="" />
      <WeatherInfo weather={weather} />
      <WeatherButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
