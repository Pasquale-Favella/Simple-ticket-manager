import './App.css';
import { Home } from './pages/Home';
import { Tickets } from './pages/Tickets';
import { NavBar } from './components/NavBar';
import { useStateValue } from './providers/StateProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const [ {user} ] = useStateValue();

  return (
    <div className="App">
      
      {
        !user ? 
            (<div>no logged</div>) 
          : 
            (<Router>
              <NavBar/>
                <Switch>
                  <Route exact path="/">
                    <Home/>
                  </Route>
                  <Route exact path="/tickets">
                    <Tickets/>
                  </Route>
                </Switch>
            </Router>)
      }
    </div>
  );
}

export default App;
