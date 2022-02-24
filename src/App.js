import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import { createContext } from "react";

export const WeatherAppContext = createContext();

function App() {
  const value = {weather: []};

  return (
    <WeatherAppContext.Provider value={value}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </BrowserRouter>
    </WeatherAppContext.Provider>
  );
}

export default App;
