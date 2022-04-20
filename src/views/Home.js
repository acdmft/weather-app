import { useState, useContext } from "react";
import { useEffect } from "react";
// views and components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
//react-hook-form
import { useForm } from "react-hook-form";
// context
import { FavoriteCitiesContext } from "../App";
// fetch weather API 
import { fetchApi } from "../utils/fetchApi";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [currentCity, setCurrentCity] = useState(JSON.parse(localStorage.getItem("favoriteCities"))[0] || "paris");
  const [background, setBackground] = useState("snow")
  // react-hooks-form
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // context (favorite cities, 3 max)
  const appContext = useContext(FavoriteCitiesContext);
  // set current weather background 
  const getWeatherBackground = (weather) => {
    switch (weather.main) {
      case "Thunderstorm":
      case "Tornado":
      case "Squall":
        setBackground("storm");
        break;
      case "Drizzle":
        setBackground("drizzle");
        break;
      case "Rain":
        setBackground("rain");
        break;
      case "Snow":
        setBackground("snow");
        break;
      case "Clear":
        setBackground("sun");
        break;
      case "Clouds":
        setBackground("clouds");
        break; 
      case "Mist":
      case "Haze":
      case "Fog":
      case "Smoke":
        setBackground("mist");
        break;
      case "Dust":
      case "Sand":
      case "Ash":
        setBackground("dust");
        break;
    }
  }

  // get the weather of the city from the favorite cities or default city (Paris)
  useEffect(() => {
    console.log(currentCity)
    fetchApi(currentCity)
      .then((res) => {
        setWeather(res);
        getWeatherBackground(res);
        // setWeather(res.main.weather);
        // console.log(res.list[0].main.temp);
        console.log(res.weather[0].main)
      })
      .catch((error) => console.log("Something went wrong during fetching the city"));
  }, [currentCity]);

  const setCity = () => {
    let city = getValues("city").toLowerCase();
    setCurrentCity(city);
  };
  //allows to add only 3 cities to WeatherAppContext
  const addCityToFavorite = () => {
    if (
      !appContext.favoriteCities.includes(currentCity) &&
      appContext.favoriteCities.length < 3
    ) {
      const favoriteCitiesCopy = [...appContext.favoriteCities, currentCity];
      appContext.setFavoriteCities(favoriteCitiesCopy);
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCitiesCopy));
    }
    console.log("addCitytoFav", appContext.favoriteCities);
  };

  return (
    <div className={`container mx-auto px-5 min-h-fit flex flex-col justify-around background-${background}`}>
      <Navbar />
      <h1>Home</h1>
      <form onSubmit={handleSubmit(setCity)}>
        <label>Enter city:</label>
        <input
          type="text"
          {...register("city", { required: true })}
          name="city"
          placeholder="city"
        />
        {errors.city && <span>Please enter a city name</span>}
        <button>Search</button>
      </form>
      {weather ? <CityCard weather={weather} onClick={addCityToFavorite} children={"Add to favorite"} /> : <p>loading ... </p>}
      <Footer />
    </div>
  );
}
