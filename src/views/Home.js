import { useState, useContext } from "react";
import { useEffect } from "react";
// views and components
import InfoBar from "../components/InfoBar";
import CityCard from "../components/CityCard";
//react-hook-form
import { useForm } from "react-hook-form";
// context
import { FavoriteCitiesContext } from "../App";
// fetch weather API
import { fetchApi } from "../utils/fetchApi";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const favoriteCities =
    JSON.parse(localStorage.getItem("favoriteCities")) || [];
  const [currentCity, setCurrentCity] = useState(favoriteCities[0] || "paris");
  const [background, setBackground] = useState("");
  console.log(background);
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
    console.log("weather.main", weather.main);
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
  };

  // get the weather of the city from the favorite cities or default city (Paris)
  useEffect(() => {
    console.log(currentCity);
    fetchApi(currentCity)
      .then((res) => {
        setWeather(res);
        getWeatherBackground(res.weather[0]);
        // setWeather(res.main.weather);
        // console.log(res.list[0].main.temp);
        console.log(res.weather[0].main);
      })
      .catch((error) =>
        console.log("Something went wrong during fetching the city")
      );
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
      localStorage.setItem(
        "favoriteCities",
        JSON.stringify(favoriteCitiesCopy)
      );
    }
    console.log("addCitytoFav", appContext.favoriteCities);
  };

  return (
    <div
      className={`container p-0 mx-auto flex flex-col       
       justify-around background-${background}`}
    >
      <InfoBar />
      <form
        onSubmit={handleSubmit(setCity)}
        className="w-screen sm:w-1/4 md:w-1/2 mx-auto mt-16"
      >
        <div className="mt-1 relative rounded-md shadow-sm w-5/6 sm:w-1/2 mx-auto">

        <input
          type="text"
          {...register("city", { required: true })}
          name="city"
          placeholder="city"
          className="
							form-control
							block
							w-full
							px-3 py-1.5
							text-base font-normal text-gray-700
							bg-white bg-clip-padding
							border border-solid border-gray-300
							rounded-md shadow-sm
							transition
							ease-in-out
							m-0
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
						"
        />
        {errors.city && <span>Please enter a city name</span>}
        </div>
        <div className="flex flex-row justify-around pt-5">
          <button className="btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-row justify-around m-4">
        {weather ? (
          <CityCard
            weather={weather}
            onClick={addCityToFavorite}
            children={"Add to favorite"}
          />
        ) : (
          <p>loading ... </p>
        )}
      </div>
     
    </div>
  );
}
