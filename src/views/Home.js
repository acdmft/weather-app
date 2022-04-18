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
  // react-hooks-form
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // context (favorite cities, 3 max)
  const appContext = useContext(FavoriteCitiesContext);

  // get the weather of the city from the favorite cities or default city (Paris)
  useEffect(() => {
    console.log(currentCity)
    fetchApi(currentCity)
      .then((res) => {
        setWeather(res)
        // setWeather(res.main.weather);
        // console.log(res.list[0].main.temp);
        console.log(res)
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
    <>
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
    </>
  );
}
