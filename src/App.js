import './App.css';
import MakeHeader from './Header';
import MakeFooter from './Footer';
import BlackJack from './BlackJackHome';
import BlackJackRules from './BlackJackRules';
import BlackJackGame from './BlackJackGame.js';
import Home from './Home';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <MakeHeader />
      <div className="container">
        <Routes>
          <Route path="/Home.js" element={ <Home />} />
          <Route path="/BlackJack.js" element={ <BlackJack />} />
          <Route path="/BlackJackGame.js" element={ <BlackJackGame />} />
          <Route path="/BlackJackRules.js" element={ <BlackJackRules />} />
        </Routes>
      </div>
      <MakeFooter />
    </div>
  );
}

export default App;
