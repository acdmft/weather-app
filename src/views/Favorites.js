import { useContext, useEffect } from "react";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
//context
import { FavoriteCitiesContext } from "../App";
// fetch weather API
import { fetchApi } from "../utils/fetchApi";

export default function Favorites() {
  const appContext = useContext(FavoriteCitiesContext);
  
  useEffect(() => {
    console.log(appContext.favoriteCities);
  }, [appContext.length]);

  const removeFavorite = (cityId) => {
    appContext.favoriteCities.splice(cityId, 1);
    console.log(appContext.favoriteCities);
  };

  return (
    <>
      <Navbar />
      <h1>Favorites</h1>
      {appContext.favoriteCities.length > 0 ? (
        <>
          {appContext.favoriteCities.map((city, i) => {
            return ( <CityCard cityName={city} cityId={i} key={i} onClick={() => {removeFavorite(i)}} /> ) 
          })}
        </>
      ) : (
        <p>There is no cities in favorites yet</p>
      )}

      <Footer />
    </>
  );
}
