import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">    
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" exact component={HomePage}/>
      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
