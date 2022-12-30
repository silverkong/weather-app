import React from "react";

const Button = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className="btn_wrap">
      <button
        className={`${selectedCity === "" ? "btn btn_active" : "btn"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </button>
      {cities.map((city) => (
        <button
          key={city}
          className={`${selectedCity === city ? "btn btn_active" : "btn"}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default Button;
