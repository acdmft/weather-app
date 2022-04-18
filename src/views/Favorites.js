import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
//context
import { FavoriteCitiesContext } from "../App";
// fetch weather API
import { fetchApi } from "../utils/fetchApi";

export default function Favorites() {
  // favorite cities context
  const appContext = useContext(FavoriteCitiesContext);
  // array of weather objects (for each city from context)
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    console.log(appContext.favoriteCities);
    if (appContext.favoriteCities.length !== 0) {
      setIsLoading(true);
      fetchCitiesWeather();
    }
  }, [appContext.favoriteCities]);
  
  // get the weather of each city from context array 
  const fetchCitiesWeather = async () => {
    console.log('fetchCitiesWeather');
    const promises = [];
    appContext.favoriteCities.forEach((city) => promises.push(fetchApi(city)));
    await Promise.all(promises).then((res) => setCitiesWeather(res));
    setIsLoading(false);
  }

  const removeFavorite = (index) => {
    // remove from context 
    const favoriteCitiesCopy = [...appContext.favoriteCities];
    favoriteCitiesCopy.splice(index, 1);
    appContext.setFavoriteCities(favoriteCitiesCopy);
    // remove from localStorage 
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCitiesCopy));
  };

  if (isLoading) {
		return <>
    <Navbar />
    <h3>Loading ...</h3>
    <Footer />
    </>
	}

  return (
    <>
      <Navbar />
      <h1>Favorites</h1>

      {appContext.favoriteCities.length > 0 ? (
        <>
          {citiesWeather.map((weather, i) => {
            return ( <CityCard key={i} weather={weather} onClick={() => {removeFavorite(i)}} children={"Remove"} /> ) 
          })}
        </>
      ) : (
        <p>There is no cities in favorites yet</p>
      )}
      {/* Go back to home page link */}
      <button>
        <Link to="/">Go back</Link> 
      </button>

      <Footer />
    </>
  );
}
