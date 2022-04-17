import { useEffect, useState } from "react";
import { useContext } from "react";
import { WeatherAppContext } from "../App";

// fetch weather for the city
export default function CityCard(props) {
  const [cityWeather, setWeather] = useState([]);
  const appContext = useContext(WeatherAppContext);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName},fr&appid=0385b2073dd106cd2ae5019621c6b1ba`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeather(res.list[0].main.temp);
        console.log(res.list[0].main.temp);
      })
      .catch((error) =>
        console.log("Something went wrong during fetching the city")
      );
  }, []);

  const removeFromFavorites = (cityId) => {
    appContext.favCities.splice(cityId, 1);
    console.log(appContext.favCities);
  };

  return (
    <>
      <h3>{props.cityName}</h3>
      <p>temperature: {cityWeather} </p>
      <button
        onClick={props.onClick}
      >
        -
      </button>
    </>
  );
}
