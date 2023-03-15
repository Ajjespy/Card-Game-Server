import React from 'react';
import './header.css';
import logo from './shuffle_logo.png';
import spade from './spade.png';
import diamond from './diamond.png';
import club from './club.png';
import heart from './heart.png';
import './App.css';
import { Link } from "react-router-dom";

function MakeHeader() { 
    return(
        <div>
            <header>
                {/* make these buttons have options */}
                <Link to="/Home.js"><img src={logo} alt='logo' className='headerLogo'></img></Link>
                <div className='dropDown'>
                    <button className='singlePlayerBtn headerBtn'>Single Player</button>
                    <div className="gamesDropdown">
                        <Link to="/BlackJack.js" className="navLink">Black Jack</Link>
                    </div>
                </div>
                <div className='dropDown'>
                    <button className='multiPlaerBtn headerBtn'>Multiplayer</button>
                    <div className='gamesDropdown'>
                        <Link to="/OhHeavens.js" className="navLink">Oh Heavens</Link>                        
                    </div>
                </div>
            </header>
            <div id='suitsDiv'>
                <img src={spade} alt='' className='headerSuit'></img>
                <img src={diamond} alt='' className='headerSuit'></img>
                <img src={club} alt='' className='headerSuit'></img>
                <img src={heart} alt='' className='headerSuit'></img>
            </div>
        </div>
    )
}

export default MakeHeader