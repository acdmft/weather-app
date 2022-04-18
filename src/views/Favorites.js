import { useContext, useEffect, useState } from "react";
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
  const [citiesWeather, setCitiesWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (appContext.favoriteCities.length !== 0) {
      fetchCitiesWeather();
    }
  }, [appContext.favoriteCities]);

  // get the weather of each city from context array 
  const fetchCitiesWeather = async () => {
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
          {appContext.favoriteCities.map((city, i) => {
            return ( <CityCard key={i} weather={citiesWeather[i]} onClick={() => {removeFavorite(i)}} children={"Remove"} /> ) 
          })}
        </>
      ) : (
        <p>There is no cities in favorites yet</p>
      )}

      <Footer />
    </>
  );
}
