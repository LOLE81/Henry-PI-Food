import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions';
import Recipe from './Recipe';
import { Link } from 'react-router-dom'
import Paged from './Paged';



export default function Home (){
    
    const dispatch = useDispatch(); // declaro una const con la función que retorna el dispatch con sus acciones
    const allRecipes = useSelector((state) => state.recipes); // con el hook me traigo el estado de recipes
    const [page, setPage] = useState(1); // creo un estado local para la página actual
    const [recipesPage, setRecipesPage] = useState(9); // creo otro estado local con la cantidad de recetas por página
    const quantityRecipesPage = page * recipesPage; // 9 ---> va a ser la cantidad que muestre por página
    const firstRecipePage = quantityRecipesPage - recipesPage; // 0 ---> va a ser el índice de la primer receta mostrada
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage); // de todos las recetas, éstas son las que voy a mostrar por página

    const paged = function(pageNumber) { //la función que va a paginar, va a ir cambiando el estado local de la página actual
        setPage(pageNumber)
    };


    useEffect(() => {                   // component did mount
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    return(
        <div>
            <Link to="/recipe">Add Recipe</Link>
            <h2>Food for foodies</h2>
            <button onClick={handleClick}>Refresh recipes</button>
            <div>
                <select name="alphabetical">
                    <option value="asc">Ascendant</option>
                    <option value="desc">Descendant</option>
                </select>
                <select name="numerical">
                    <option value="asc">Ascendant</option>
                    <option value="desc">Descendant</option>
                </select>
                <select name="diets">
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                </select>
            </div>

            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

            {
                showRecipesPage?.map(e => {
                    return (
                        <div>
                            <Recipe image={e.image} name={e.name} dietTypes={e.dietTypes}/>
                        </div>
                    )
                })
            }

        </div>

    )
}