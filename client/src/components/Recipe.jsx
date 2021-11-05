import React from "react";
import './recipe.css';


let prevId = 1;

export default function Recipe(recipes) {
    const { image, name, dietTypes } = recipes    
    return (
        <div className="recipe">
            <img src={image} alt="Not found" width="250px" height="200px" />
            <h2>{name}</h2>            
            <h3>{dietTypes?.map(e => {
                return (
                    <span key={prevId++}>|{e}| </span>
                )
            })}
            </h3>
        </div>
    )
};
