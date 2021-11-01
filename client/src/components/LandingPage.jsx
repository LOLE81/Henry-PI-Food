import React from "react";
import { Link } from 'react-router-dom';


export default function LandingPage(){
    return (
        <div>
            <h1>Welcome to my first web page!</h1>
            <Link to='/home'>
                <button>Home</button>
            </Link>

        </div>
    )
}
