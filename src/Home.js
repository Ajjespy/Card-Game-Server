import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    return (
        <div id='home'>
            <h1>Home</h1>
            <div className="gameOptions">
                <div className="singlePlayerGamesList">
                    <h2>Single Player Games</h2>
                    <ul>
                        <li><Link to="/BlackJack.js" className="homeLink">Black Jack</Link></li>
                    </ul>
                </div>
                <div className="MultiplayerGamesList">
                    <h2>Multiplayer Games</h2>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Home