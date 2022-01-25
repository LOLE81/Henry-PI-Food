import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';


function App() {
  return (
    <BrowserRouter>
    <div className="App">    
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" exact component={HomePage}/>
        <Route path="/recipe" exact component={AddRecipe}/>
        <Route path="/home/:id" component={RecipeDetails}/>        
      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
