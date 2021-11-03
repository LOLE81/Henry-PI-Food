import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from '../actions/index'

export default function AddRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);
    const history =useHistory();
    
    
    const [input, setInput] = useState({
      name: ''  ,
      summary: '',
      score: '',
      healthScore: '',
      steps: [],
      dietTypes: []
    })

    useEffect(() => {
        dispatch(getDietTypes());
    }, [dispatch]);

    
    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })    
    };

    function handleCheckBox(e) {        
        
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);

        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }

        setInput({
            ...input,
            dietTypes: newArray
        });
     
        console.log(input)

    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addRecipe(input));
        alert('New recipe added successfully!')
        setInput({
            name: "",
            summary: '',
            score: '',
            healthScore: '',
            steps: [],
            dietTypes: []
        })    
        history.push('/home')
    };

    return (
        <div>
            <Link to="/home"><button>Go back</button></Link>
            <h1>Creat your own recipe!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input name="name" type="text" value={input.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Summary</label>
                    <input name="summary" type="text" value={input.summary} onChange={handleChange}/>
                </div>
                <div>
                    <label>Score</label>
                    <input name="score" type="number" value={input.score} onChange={handleChange}/>
                </div>
                <div>
                    <label>Health Score</label>
                    <input name="healthScore" type="number" value={input.healthScore} onChange={handleChange}/>
                </div>
                <div>
                    <label>Steps</label>
                    <input name="steps" type="text" value={input.steps} onChange={handleChange}/>
                </div>
                <div>
                    <label>Diet Types</label>
                    {dietTypes.map(d =>{
                        return (
                            <div>
                                <label>{d}</label>
                                <input type="checkbox" name={d} value={d} selected={input.dietTypes.includes(d)} onChange={e => handleCheckBox(e)}/>
                            </div>
                        )
                    })}
                </div>
                <button type="submit">Submit Recipe</button>
            </form>
        </div>



    )

};