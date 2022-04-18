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
  const [weather, setWeather] = useState([]);
  const [currentCity, setCurrentCity] = useState(JSON.parse(localStorage.getItem("favoriteCities")) || "paris");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const appContext = useContext(FavoriteCitiesContext);

  // get the weather of the city from the favorite cities or default city (Paris)
  useEffect(() => {
    fetchApi(currentCity)
      .then((res) => {
        setWeather(res.list[0].main.temp);
        console.log(res.list[0].main.temp);
      })
      .catch((error) => console.log("Something went wrong during fetching the city"));
  }, []);

  const handleCityInput = () => {
    let city = getValues("city").toLowerCase();
    setCurrentCity(city);
  };
  //allows to add only 3 cities to WeatherAppContext
  const addCityToFavorite = () => {
    if (
      !appContext.favoriteCities.includes(currentCity) &&
      appContext.favoriteCities.length < 3
    ) {
      appContext.setFavoriteCities(currentCity);
    }
    console.log("addCitytoFav", appContext.favoriteCities);
  };

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <form onSubmit={handleSubmit(handleCityInput)}>
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
      {currentCity !== "" ? (
        <>
          <p>{currentCity}</p>
          <button onClick={addCityToFavorite}>Add to favorite</button>
        </>
      ) : (
        <p>getting city...</p>
      )}
      {weather.length !== 0 ? <p>temperature: {weather}</p> : <p>Loading...</p>}
      <CityCard weather={weather} />
      <Footer />
    </>
  );
}
