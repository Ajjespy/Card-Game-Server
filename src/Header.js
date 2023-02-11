import React from 'react';
import './header.css';
import logo from './shuffle_logo.png';
import spade from './spade.png';
import diamond from './diamond.png';
import club from './club.png';
import heart from './heart.png';
import './App.css';

function MakeHeader() { 
    return(
        <div>
            <header>
                {/* make these buttons have options */}
                <button class='headerBtn'>Single Player</button>
                <img src={logo} alt='logo' className='headerLogo'></img>
                <button class='headerBtn'>Multiplayer</button>
            </header>
            <div id='suitsDiv'>
                <img src={spade} alt='spade' className='headerSuit'></img>
                <img src={diamond} alt='diamond' className='headerSuit'></img>
                <img src={club} alt='club' className='headerSuit'></img>
                <img src={heart} alt='heart' className='headerSuit'></img>
            </div>
        </div>
    )
}

export default MakeHeader