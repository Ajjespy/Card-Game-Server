// whoWon() - S
// Trump cards/highest within suit (aces?)
// Determine who had the highest ranking card in the trick
// Order of current playerQueue[] = order of pile[]
// Temporary list of winning suit (check for trump first and then check for cards that match the suit of the first card)
// Who won the last trick (return value)

import React from "react";
// import Modal from './Modal.js';
import Card from "./components/Card";
import "./App.css";
import {
    card_back,
    ace_of_spades,
    two_of_spades,
    three_of_spades,
    four_of_spades,
    five_of_spades,
    six_of_spades,
    seven_of_spades,
    eight_of_spades,
    nine_of_spades,
    ten_of_spades,
    jack_of_spades,
    queen_of_spades,
    king_of_spades,
    ace_of_clubs,
    two_of_clubs,
    three_of_clubs,
    four_of_clubs,
    five_of_clubs,
    six_of_clubs,
    seven_of_clubs,
    eight_of_clubs,
    nine_of_clubs,
    ten_of_clubs,
    jack_of_clubs,
    queen_of_clubs,
    king_of_clubs,
    ace_of_hearts,
    two_of_hearts,
    three_of_hearts,
    four_of_hearts,
    five_of_hearts,
    six_of_hearts,
    seven_of_hearts,
    eight_of_hearts,
    nine_of_hearts,
    ten_of_hearts,
    jack_of_hearts,
    queen_of_hearts,
    king_of_hearts,
    ace_of_diamonds,
    two_of_diamonds,
    three_of_diamonds,
    four_of_diamonds,
    five_of_diamonds,
    six_of_diamonds,
    seven_of_diamonds,
    eight_of_diamonds,
    nine_of_diamonds,
    ten_of_diamonds,
    jack_of_diamonds,
    queen_of_diamonds,
    king_of_diamonds
} from "./PNG-cards/CardImages";

const SUIT_INDEX = 0;
const VALUE_INDEX = 1;
const NAME_INDEX = 2;
const COLOR_INDEX = 3;
const FILEPATH_INDEX = 4;

class OhHeavens extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            trumpSuit: "",
            deck: [],
            cardsDict: {},
            dealerQueue: [],
            playQueue: [],
            playerList: [],
            scoreboard: [],
            pile: [],
            currentRound: 0,
            numberOfCards: 7,
            gameWinner: null
        }
        this.createCardsDict = this.createCardsDict.bind(this);
        this.createDeck = this.createDeck.bind(this);
        this.drawCards = this.drawCards.bind(this);
        this.resetRound = this.resetRound.bind(this);
        this.canPlayCard = this.canPlayCard.bind(this);
        this.whoWonTrick = this.whoWonTrick.bind(this);
        this.updateTricksWon = this.updateTricksWon.bind(this);
        this.playGame = this.playGame.bind(this);
    }
    async createCardsDict() {
        const editedCardsDict = {
            "ASpades":["Spades", 14, "A", "Black", ace_of_spades],
            "2Spades":["Spades", 2, "2", "Black", two_of_spades],
            "3Spades":["Spades", 3, "3", "Black", three_of_spades],
            "4Spades":["Spades", 4, "4", "Black", four_of_spades],
            "5Spades":["Spades", 5, "5", "Black", five_of_spades],
            "6Spades":["Spades", 6, "6", "Black", six_of_spades],
            "7Spades":["Spades", 7, "7", "Black", seven_of_spades],
            "8Spades":["Spades", 8, "8", "Black", eight_of_spades],
            "9Spades":["Spades", 9, "9", "Black", nine_of_spades],
            "10Spades":["Spades", 10, "10", "Black", ten_of_spades],
            "JSpades":["Spades", 11, "J", "Black", jack_of_spades],
            "QSpades":["Spades", 12, "Q", "Black", queen_of_spades],
            "KSpades":["Spades", 13, "K", "Black", king_of_spades],

            "AClubs": ["Clubs", 14, "A", "Black", ace_of_clubs],
            "2Clubs": ["Clubs", 2, "2", "Black", two_of_clubs],
            "3Clubs": ["Clubs", 3, "3", "Black", three_of_clubs],
            "4Clubs": ["Clubs", 4, "4", "Black", four_of_clubs],
            "5Clubs": ["Clubs", 5, "5", "Black", five_of_clubs],
            "6Clubs": ["Clubs", 6, "6", "Black", six_of_clubs],
            "7Clubs": ["Clubs", 7, "7", "Black", seven_of_clubs],
            "8Clubs": ["Clubs", 8, "8", "Black", eight_of_clubs],
            "9Clubs": ["Clubs", 9, "9", "Black", nine_of_clubs],
            "10Clubs": ["Clubs", 10, "10", "Black", ten_of_clubs],
            "JClubs": ["Clubs", 11, "J", "Black", jack_of_clubs],
            "QClubs": ["Clubs", 12, "Q", "Black", queen_of_clubs],
            "KClubs": ["Clubs", 13, "K", "Black", king_of_clubs],

            "AHearts":["Hearts", 14, "A", "Red", ace_of_hearts],
            "2Hearts":["Hearts", 2, "2", "Red", two_of_hearts],
            "3Hearts":["Hearts", 3, "3", "Red", three_of_hearts],
            "4Hearts":["Hearts", 4, "4", "Red", four_of_hearts],
            "5Hearts":["Hearts", 5, "5", "Red", five_of_hearts],
            "6Hearts":["Hearts", 6, "6", "Red", six_of_hearts],
            "7Hearts":["Hearts", 7, "7", "Red", seven_of_hearts],
            "8Hearts":["Hearts", 8, "8", "Red", eight_of_hearts],
            "9Hearts":["Hearts", 9, "9", "Red", nine_of_hearts],
            "10Hearts":["Hearts", 10, "10", "Red", ten_of_hearts],
            "JHearts":["Hearts", 11, "J", "Red", jack_of_hearts],
            "QHearts":["Hearts", 12, "Q", "Red", queen_of_hearts],
            "KHearts":["Hearts", 13, "K", "Red", king_of_hearts],

            "ADiamonds": ["Diamonds", 14, "A", "Red", ace_of_diamonds],
            "2Diamonds": ["Diamonds", 2, "2", "Red", two_of_diamonds],
            "3Diamonds": ["Diamonds", 3, "3", "Red", three_of_diamonds],
            "4Diamonds": ["Diamonds", 4, "4", "Red", four_of_diamonds],
            "5Diamonds": ["Diamonds", 5, "5", "Red", five_of_diamonds],
            "6Diamonds": ["Diamonds", 6, "6", "Red", six_of_diamonds],
            "7Diamonds": ["Diamonds", 7, "7", "Red", seven_of_diamonds],
            "8Diamonds": ["Diamonds", 8, "8", "Red", eight_of_diamonds],
            "9Diamonds": ["Diamonds", 9, "9", "Red", nine_of_diamonds],
            "10Diamonds": ["Diamonds", 10, "10", "Red", ten_of_diamonds],
            "JDiamonds": ["Diamonds", 11, "J", "Red", jack_of_diamonds],
            "QDiamonds": ["Diamonds", 12, "Q", "Red", queen_of_diamonds],
            "KDiamonds": ["Diamonds", 13, "K", "Red", king_of_diamonds]    
        }
        this.setState({
            cardsDict: editedCardsDict
        })
    }
    async createDeck() {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
        var editedDeck = this.state.deck;
        var cardsDict = this.state.cardsDict;
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < suits.length; j++) {
                var key = values[i] + suits[j];
                var card = new Card();
                card.setSuit(cardsDict[key][SUIT_INDEX]);
                card.setValue(cardsDict[key][VALUE_INDEX]);
                card.setColor(cardsDict[key][COLOR_INDEX]);
                card.setName(cardsDict[key][NAME_INDEX]);
                card.setFilepath(cardsDict[key][FILEPATH_INDEX]);
                editedDeck.push(card);
            }
        }
        this.setState({
            deck: editedDeck
        })
    }
    async drawCards(hand, number) {
        var tempHand = hand;
        var tempDeck = this.state.deck;
        for (var i = 0; i < number; i++) {
            // Generate a random card
            var randCardIndex = Math.floor(Math.random() * tempDeck.length - 1);
            var randCard = tempDeck.splice(randCardIndex, 1);
    
            // Add the card to the player's hand
            tempHand.push(randCard[0]);
        }
        this.setState({
            hand: tempHand,
            deck: tempDeck
        }, () => {
            console.log(`finished setting hand: ${hand}`)
        });
    }
    resetRound() {
        this.setState({
            deck: [],
            pile: []
        }, () => {
            this.createDeck();
            this.numberOfCards();
            this.drawCards();
            // loop through players?
            // resetPlayer();
        });
    }
    canPlayCard(player) {
        var tempHand = player.getHand();
        var firstCardSuit = this.state.pile[0].getSuit();
        var validCards = [];
        var invalidCards = [];
        for (var i = 0; i < tempHand.length; i++) {
            var card = tempHand.splice(i, 1);
            if (tempHand[i].getSuit() === firstCardSuit) {
                validCards.push(card);
            }
            else {
                invalidCards.push(card);
            }
        }
        if (validCards.length === 0) {
            validCards = tempHand;
        }
        return validCards, invalidCards
    }
    // not finished yet
    whoWonTrick() {
        // pull trump cards if any
        // highest trump card = winner
        // else highest of first suit = winner
        var pile = this.state.pile;
        var firstCardSuit = this.state.pile[0].getSuit();
        var trumpSuitCards = [];
        var originalSuitCards = [];
        var highest;
        var winningCard;
        for (var card in pile) {
            if (card.getSuit() === this.state.trumpSuit) {
                trumpSuitCards.push(card);
            }
            else if (card.getSuit() === firstCardSuit) {
                originalSuitCards.push(card);
            }
        }
        // if there is a trump card, ignore the others
        if (trumpSuitCards.length > 0) {
            // figure out which card is the highest
            if (trumpSuitCards.length === 1) {
                winningCard = trumpSuitCards[0];
            }
            else {
                // loop through cards to figure out which is highest
            }
        }
        else {
            if (originalSuitCards.length === 1) {
                winningCard = originalSuitCards[0];
            }
        }
        
        // pile and playerQueue should match up - return winningPlayer
        
        
    }
    // should this just be part of whoWon()?
    updateTricksWon(winningPlayer) {
        winningPlayer.setTricksWon();
    }
    playGame() {

    }
    render() {
        return (
            <div className="ohHeavens">
                <h1>Oh Heavens</h1>
                <button onClick={this.playGame}>Start</button>

            </div>
        )
    }
}
export default OhHeavens