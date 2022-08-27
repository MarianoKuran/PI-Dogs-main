import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from "./components/Home/Home.jsx";
import Details from './components/Details/Details';
import CreateDog from './components/CreateDog/CreateDog.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreateDog} />
          <Route path="/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
