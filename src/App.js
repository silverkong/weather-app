import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";
import WeatherInfo from "./component/WeatherInfo";
import WeatherButton from "./component/WeatherButton";

import background from "./images/background.jpg";

// API Key 불러오기
const weatherAPIKey = process.env.REACT_APP_WEATHER_API;
// 보고싶은 도시 지정
const cities = ["Tokyo", "Berlin", "Moscow", "Seoul"];

function App() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  // 자식에게 줄 state도 app에 지정해야 부모와 자식이 같이 사용 가능
  const [city, setCity] = useState("");

  // 현재 위치에 대한 날씨 정보
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  // 선택한 city에 대한 날씨 정보
  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
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
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div className="wrap">
      <img src={background} className="background" alt="" />
      {/* 조건으로 UI 설정 */}
      {loading ? (
        <ClipLoader color="#6495ed" loading={loading} size={150} />
      ) : (
        <div>
          <WeatherInfo weather={weather} />
          <WeatherButton
            cities={cities}
            selectedCity={city}
            handleCityChange={handleCityChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
