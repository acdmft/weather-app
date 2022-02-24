import { useContext } from "react";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
//context
import { WeatherAppContext } from "../App";

export default function Favorites() {
  const appContext = useContext(WeatherAppContext);
  return (
    <>
      <Navbar />
      <h1>Favorites</h1>
      {appContext.favCities.length > 0 ? (
        <>
          {appContext.favCities.map((city) => {
            return ( <CityCard cityName={city} />)
          })}
        </>
      ) : (
        <p>There is no cities in favorites yet</p>
      )}

      <Footer />
    </>
  );
}
