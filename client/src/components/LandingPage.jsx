import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';

export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="welcomeMsg">You like to cook? This is your place!</h1>
            <Link to='/home'>
                <button className="homeButton">Let's go</button>
            </Link>

        </div>
    )
}
