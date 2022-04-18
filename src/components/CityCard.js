import { useEffect, useState } from "react";
import { useContext } from "react";
// context 
import { FavoriteCitiesContext } from "../App";


export default function CityCard({weather, onClick, children}) {
  return (
    <>
      {/* city name */}
      <h3>{weather.name}</h3>
      <p>temperature: {weather.main.temp} </p>
      <button
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
