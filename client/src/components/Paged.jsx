import React from "react";
import './paged.css';

export default function Paged({recipesPage, allRecipes, paged}) { //le paso por props las recetas por página, la cantidad total de recetas, la función de paginado.
    const pages = []; // creo constante donde voy a poner números de página
        
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++) { // con este for calculo cuántas páginas voy a tener y pusheo uno a uno los números.
        pages.push(i)
    };
    
    return(
        <nav className="pagination">
            <ul className="pages">
                {pages?.map(p =>(
                        <li className="page" key={p}>
                            <a onClick={() => paged(p)} style={{width:"30px"}}>{p}</a>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
};