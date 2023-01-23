import React from 'react';
import './App.css';
import './footer.css';
import logo from './shuffle_logo.png';

function MakeFooter() { 
    return(
        <div id='footerDiv'>
            <footer>
                <img src={logo} alt='logo' className='footerLogo'></img>
                <p>*insert footer information here - maybe github link or something?* | &copy; 2023</p>
            </footer>
        </div>
    )
}

export default MakeFooter