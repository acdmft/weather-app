import { useContext, useEffect } from "react";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
//context
import { WeatherAppContext } from "../App";

export default function Favorites() {
  const appContext = useContext(WeatherAppContext);
  
  useEffect(() => {
    console.log(appContext.favCities);
  }, [appContext.length]);

  const removeFavorite = (cityId) => {
    appContext.favCities.splice(cityId, 1);
    console.log(appContext.favCities);
  };

  return (
    <>
      <Navbar />
      <h1>Favorites</h1>
      {appContext.favCities.length > 0 ? (
        <>
          {appContext.favCities.map((city, i) => {
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
