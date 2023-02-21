import { Link } from "react-router-dom";
import './blackJack.css';
import Card from './components/Card';

function BlackJack() {
    return (
        <div className="blackJack">
            <h1>BlackJack</h1>
            <div className="gameBtnDiv">
                <Link to="/BlackJackGame.js"><button className="gameHomeBtn">Play</button></Link>
                <Link to="/BlackJackRules.js" className="link"><button className="gameHomeBtn">Rules</button></Link>
            </div>
        </div>
    );
}
export default BlackJack