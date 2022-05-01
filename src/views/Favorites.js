import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import InfoBar from "../components/InfoBar";
import CityCard from "../components/CityCard";
//context
import { FavoriteCitiesContext } from "../App";
// fetch weather API
import { fetchApi } from "../utils/fetchApi";
// toastify
import { toast } from "react-toastify";

export default function Favorites() {
  // favorite cities context
  const appContext = useContext(FavoriteCitiesContext);
  // array of weather objects (for each city from context)
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // THEMES
  const [morningTheme, dayTheme, eveningTheme, nightTheme] = [
    "from-fuchsia-400 to-violet-400",
    "from-green-400 to-blue-500 ",
    "from-blue-500 to-purple-900",
    "from-indigo-900 to-slate-900",
  ];
  // get time and set theme
  const time = new Date().getHours();
  const themes = [
    nightTheme,
    nightTheme,
    nightTheme,
    nightTheme,
    nightTheme,
    morningTheme,
    morningTheme,
    morningTheme,
    morningTheme,
    morningTheme,
    morningTheme,
    morningTheme,
    dayTheme,
    dayTheme,
    dayTheme,
    dayTheme,
    dayTheme,
    dayTheme,
    eveningTheme,
    eveningTheme,
    eveningTheme,
    eveningTheme,
    eveningTheme,
    eveningTheme,
  ];
  const theme = themes[time];  

  useEffect(() => {
    if (appContext.favoriteCities.length !== 0) {
      setIsLoading(true);
      fetchCitiesWeather();
    }
  }, [appContext.favoriteCities]);

  // get the weather of each city from context array
  const fetchCitiesWeather = async () => {
    const promises = [];
    appContext.favoriteCities.forEach((city) => promises.push(fetchApi(city)));
    await Promise.all(promises).then((res) => setCitiesWeather(res));
    setIsLoading(false);
  };

  const removeFavorite = (index) => {
    toast.success(`${citiesWeather[index].name} is removed from favorites`);
    // remove from context
    const favoriteCitiesCopy = [...appContext.favoriteCities];
    favoriteCitiesCopy.splice(index, 1);
    appContext.setFavoriteCities(favoriteCitiesCopy);
    // remove from localStorage
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCitiesCopy));
  };

  if (isLoading) {
    return (
      <>
        <h3>Loading ...</h3>
      </>
    );
  }

  return (
    <div className={`min-h-screen pb-8 bg-gradient-to-t ${theme}`}>
      <InfoBar />
      {appContext.favoriteCities.length > 0 ? (
        <div className="flex flex-row justify-around flex-wrap">
          {citiesWeather.map((weather, i) => {
            return (
              <CityCard
                key={i}
                weather={weather}
                onClick={() => {
                  removeFavorite(i);
                }}
                children={"Remove"}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-100 font-bold md:leading-10">
          There is no cities in favorites yet
        </p>
      )}
      {/* Go back to home page link */}
      <div className="flex justify-center mt-8">
        <button className="btn-primary">
          <Link to="/">Go back</Link>
        </button>
      </div>
    </div>
  );
}
