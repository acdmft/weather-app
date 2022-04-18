import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import { useState, createContext } from "react";

export const FavoriteCitiesContext = createContext(
);

function App() {
  // get favoriteCities from local storage or set to empty array
  const [favoriteCities, setFavoriteCities] = useState(JSON.parse(localStorage.getItem("favoriteCities")) || []);

  return (
    <FavoriteCitiesContext.Provider value={{favoriteCities, setFavoriteCities}}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </BrowserRouter>
    </ FavoriteCitiesContext.Provider>
  );
}

export default App;
