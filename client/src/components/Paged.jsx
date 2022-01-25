import React from "react";
import './paged.css';

export default function Paged({recipesPage, allRecipes, paged}) {
    
    const pages = [];
        
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++) {
        pages.push(i)
    };    
      
    return(
        
        <div>
            
            {pages.length <= 1 ? 
            <></> :
            <nav className="pagination">
                
                <ul className="pages">
                    {pages?.map(p =>(
                        <li className="page" key={p}>
                            <button className="pageBtn" onClick={() => paged(p)} style={{width:"30px"}}>{p}</button>
                        </li>
                    ))}
                </ul>
    
            </nav>
            }  

        </div>
    )
};