import { useEffect, useState } from "react";
import { useContext } from "react";
// context 
import { FavoriteCitiesContext } from "../App";


export default function CityCard({weather, onClick, children}) {
  return (
    <div className="flex flex-col w-96 cityCard">
      <div className="z-10" >
      {/* city name */}
      <h3>{weather.name}</h3>
      {/* weather type */}
      <p>description: {weather.weather[0].description}</p>
      <p>temperature: {weather.main.temp} °C</p>
      <p>humidity: {weather.main.humidity}</p>
      <p>wind: {weather.wind.speed}</p>
      <button
        onClick={onClick}
      >
        {children}
      </button>

      </div>
    </div>
  );
}
