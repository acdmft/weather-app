import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Favorites from "./views/Favorites";


function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
