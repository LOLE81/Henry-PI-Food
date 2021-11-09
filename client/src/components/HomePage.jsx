import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietTypeFilter, aplhabeticalSort, scoreSort } from '../actions';
import Recipe from './Recipe';
import { Link } from 'react-router-dom'
import Paged from './Paged';
import SearchBar from './SearchBar';
import './home.css'


let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch(); // declaro una const con la función que retorna el dispatch con sus acciones
    const allRecipes = useSelector((state) => state.recipes); // con el hook me traigo el estado de recipes
    
    const [order, setOrder] = useState('') // creo un estado local para indicar el orden
    const [page, setPage] = useState(1); // creo un estado local para la página actual
    const [recipesPage, setRecipesPage] = useState(9); // creo otro estado local con la cantidad de recetas por página
    const quantityRecipesPage = page * recipesPage; // 9 ---> va a ser la cantidad que muestre por página
    const firstRecipePage = quantityRecipesPage - recipesPage; // 0 ---> va a ser el índice de la primer receta mostrada
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage); // de todos las recetas, éstas son las que voy a mostrar por página
    console.log(showRecipesPage)
    const paged = function(pageNumber) { //la función que va a paginar, va a ir cambiando el estado local de la página actual
        setPage(pageNumber)
    };


    useEffect(() => {                   // component did mount
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setPage(1);
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietTypeFilter(e.target.value))
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();
        console.log(allRecipes)
        dispatch(aplhabeticalSort(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    function handleScoreSort(e) {
        e.preventDefault();
        dispatch(scoreSort(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    return(
        <div className="home">
            <h1 className="initialMsg">Let's do it!</h1>
            <div>
                <button className="refreshButton" onClick={handleClick}>Refresh recipes</button>
                <Link to="/recipe">
                    <button className="addButton">Add Recipe</button>
                </Link>
            </div>
            <div className="select">
                <label className="filters">Filters:</label>
                <select className="select" name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alphabetical</option>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
                <select className="select" name="numerical" onChange={e => handleScoreSort(e)}>
                    <option disabled selected>Score</option>
                    <option value="asc">From Min to Max</option>
                    <option value="desc">From Max to Min</option>
                </select>
                <label className="filters">Diet Types:</label>
                <select className="select" name="diets" onChange={e => handleDietTypeFilter(e)}>
                    <option disabled selected>Select...</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
                </select>
            </div>

            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>
           
            <SearchBar/>

            <div className="allrecipes">
            {
                showRecipesPage?.map(e => {
                    return (
                        <div className="eachRecipe" key={prevId++}>
                            <Link className="linkRecetas" to={`home/${e.id}`}>
                                <Recipe
                                    image={e.image ? 
                                        e.image :
                                        'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'}
                                    name={e.name}                             
                                    dietTypes={e.dietTypes} />
                            </Link>
                        </div>
                    )
                })
            }
            </div>            
            
            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

        </div>






    )
}