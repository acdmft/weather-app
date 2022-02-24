import { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';

export default function Home() {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("Paris");
  const { register, getValues, handleSubmit, formState: { errors}, } = useForm();

  // get the current weather of the city recieved from the state
  useEffect(()=> {
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},fr&appid=0385b2073dd106cd2ae5019621c6b1ba`)
      .then((res) => res.json())
      .then((res)=> {
        setWeather(res.list[0].main.temp);
        console.log(res.list[0].main.temp); })
  }, [city])

  const handleCityInput = () => {
    setCity(getValues("city"));
  }

  return (
    <>
    <h1>Home</h1>
    <Navbar />
    <form onSubmit={handleSubmit(handleCityInput)}>
      <label>Enter city:</label>
      <input type="text" {...register("city", {required: true })}
      name="city" placeholder='city' />
      {errors.city && <span>Please enter a city name</span>}
      <button>Search</button>
    </form>
    {weather.length !== 0 ? (<p>temperature: {weather}</p>) : (<p>Loading...</p>)}
    <Footer />
    </>
  );
}