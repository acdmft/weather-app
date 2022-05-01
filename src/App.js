import { BrowserRouter, Switch, Route } from "react-router-dom";
// components and pages
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import Footer from "./components/Footer";
// context
import { useState, createContext } from "react";
// REACT-TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FavoriteCitiesContext = createContext(
);

function App() {
  // get favoriteCities from local storage or set to empty array
  const [favoriteCities, setFavoriteCities] = useState(JSON.parse(localStorage.getItem("favoriteCities")) || []);

  return (
    <FavoriteCitiesContext.Provider value={{favoriteCities, setFavoriteCities}}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </ FavoriteCitiesContext.Provider>
  );
}

export default App;
