import React from "react";
import './recipe.css';


let prevId = 1;

export default function Recipe(recipes) {
    const { image, name, dietTypes } = recipes
   
    return (
        <div className="recipe">
            
            <div>
                <img className="recipeImg" src={image} alt="Not found"/>
            </div>
            
            <div>
                <h2 className="recipeName">{name}</h2>            
            </div>

            <div className="dietcointainer">
                {dietTypes?.map(e => {
                    return (
                        <h5 className="diets" key={prevId++}>{e}</h5>
                    )
                })}            
            </div>
            
        </div>
    )
};
