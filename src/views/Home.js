import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// context
import { WeatherAppContext } from "../App";

export default function Home() {
  const [weather, setWeather] = useState([]);
  const [currentCity, setCity] = useState("paris");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const weatherAppContext = useContext(WeatherAppContext);

  // get the current weather of the city recieved from the state
  useEffect(() => {
    console.log(currentCity);
    console.log(weatherAppContext.favCities);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},fr&appid=0385b2073dd106cd2ae5019621c6b1ba`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeather(res.list[0].main.temp);
        console.log(res.list[0].main.temp);
      })
      .catch((error) => console.log("Something went wrong during fetching the city"));
  }, [currentCity]);

  const handleCityInput = () => {
    let city = getValues("city").toLowerCase();
    setCity(city);
  };
  //allows to add only 3 cities to WeatherAppContext
  const addCityToFavorite = () => {
    if (
      !weatherAppContext.favCities.includes(currentCity) &&
      weatherAppContext.favCities.length < 3
    ) {
      weatherAppContext.favCities.push(currentCity);
    }
    console.log("addCitytoFav", weatherAppContext.favCities);
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
      <Footer />
    </>
  );
}
