import React from "react";

export default function Paged({recipesPage, allRecipes, paged}) {
    const pages = [];
        
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++) {
        pages.push(i)
    };
    
    return(
        <nav>
            <ul className="pagination">
                {pages?.map(p =>(
                        <li className="page" key={p}>
                            <a onClick={() => paged(p)}>{p}</a>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
};