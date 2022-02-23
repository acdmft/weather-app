import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import { createContext } from "react";

export const WeatherContext = createContext();

function App() {
  const value = {};

  return (
    <WeatherContext.Provider value={value}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </BrowserRouter>
    </WeatherContext.Provider>
  );
}

export default App;
