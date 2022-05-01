import { useEffect, useState } from "react";
import { useContext } from "react";
// context 
import { FavoriteCitiesContext } from "../App";


export default function CityCard({weather, onClick, children}) {
  return (
    <div className="flex flex-col w-96 cityCard border border-hidden rounded-md transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-105 duration-300">
      <div className="z-10 pt-8 text-gray-100 font-bold md:leading-10" >
      {/* city name */}
      <h2 className="text-center text-xl mb-4">{weather.name}</h2>
      {/* weather type */}
      <p className="text-center">{weather.weather[0].description}</p>
      <p className="text-center">{weather.main.temp} °C</p>
      <p className="text-center">humidity: {weather.main.humidity}</p>
      <p className="text-center">wind: {weather.wind.speed}</p>
       {/* ************ BUTTON ADD TO FAVORITES *****************/}
      <div className="flex flex-row justify-around pt-5 mb-8">
      <button
        onClick={onClick}
        className = "btn-primary"
      >
        {children}
      </button>

      </div>

      </div>
    </div>
  );
}
