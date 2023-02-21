import React from "react";
import Card from "./components/Card";

class BlackJackGame extends React.Component{
    constructor(props) {
        super(props);
    }
    createCardsDict() {
        const cardsDict = {
            "ASpades":[""]
        }
    }
    createDeck() {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];

        var card = new Card()
        card.setSuit("hearts")
    }
    
    render () {        
        return (
            <div>
                <p id="deck">deck</p>
                <p id="hand">hand</p>
                <Card />
            </div>
        )
    }
}

class Hand extends React.Component {
    constructor(props) {
        super(props);
        
    }

}

export default BlackJackGame