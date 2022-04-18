import { useEffect, useState } from "react";
import { useContext } from "react";
// context 
import { FavoriteCitiesContext } from "../App";

// fetch weather for the city
export default function CityCard({weather}) {
  // const [cityWeather, setWeather] = useState([]);
  const appContext = useContext(FavoriteCitiesContext);

  // useEffect(() => {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName},fr&appid=0385b2073dd106cd2ae5019621c6b1ba`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setWeather(res.list[0].main.temp);
  //       console.log(res.list[0].main.temp);
  //     })
  //     .catch((error) =>
  //       console.log("Something went wrong during fetching the city")
  //     );
  // }, []);

  const removeFromFavorites = (cityId) => {
    // appContext.favCities.splice(cityId, 1);
    console.log(appContext.favoriteCities);
  };

  return (
    <>
      <h3>{weather.name}</h3>
      <p>temperature: {weather} </p>
      <button
        onClick={removeFromFavorites}
      >
        -
      </button>
    </>
  );
}
