import React from "react";

export default function Recipe(recipes) {
    const { image, name, dietTypes } = recipes
    return (
        <div>
            <img src={image} alt="Image not found" width="200px" height="200px" />
            <h2>{name}</h2>
            <h3>{dietTypes?.map(e => {
                return (
                    <span>|{e}| </span>
                )
            })}</h3>
        </div>
    )
};