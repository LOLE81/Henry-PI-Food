import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from '../actions';
import Recipe from './Recipe';
import { Link } from 'react-router-dom'


export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    
    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch]);


    const recipeDetails = useSelector(state => state.recipeDetails);


    return (
        <div key={id}>
            <img src={recipeDetails.image ? recipeDetails.image : 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found" width="400px" height="200px" />
            <h1>{recipeDetails.name}</h1>
            <h2>{recipeDetails.dishTypes?.map(e => {
                return(
                    <span key={e}>|{e}| </span>
                )
            })}</h2>
            <h2>{recipeDetails.dietTypes?.map(e => {
                return(
                    <span key={e}>|{e}| </span>
                )
            })}</h2>
            <p>Summary: {recipeDetails.summary}</p>
            <h3>Score: {recipeDetails.score}</h3>
            <h3>Healthiness points: {recipeDetails.healthScore}</h3>
            <ul>Steps: {Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(e => {
                return(
                    <li key={e.number}>{e.step}</li>
                    )
            }) :
            <li>{recipeDetails.steps}</li>
            }</ul>
        </div>

    )

}