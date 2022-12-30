import React from "react";

const Button = ({ cities, setCity }) => {
  return (
    <div className="btn_wrap">
      <button className="btn">Current Location</button>
      {cities.map((item, index) => (
        <button className="btn" key={index} onClick={() => setCity(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Button;
