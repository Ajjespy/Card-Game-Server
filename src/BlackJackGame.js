import React from "react";
import Modal from './Modal.js';
import Card from "./components/Card";
import "./App.css";
import "./blackJack.css";
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

class BlackJackGame extends React.Component{
    constructor(props) {
        super(props)
        this.drawCards = this.drawCards.bind(this);
        this.getAceValue = this.getAceValue.bind(this);
        this.displayHand = this.displayHand.bind(this);
        this.dealerTurn = this.dealerTurn.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.startGame = this.startGame.bind(this);
        this.state = {
            playerHand: [],
            dealerHand: [],
            values: {
                playerHandValue: 0,
                dealerHandValue: 0               
            },
            isDealerTurn: false,
            cardsDict: {},
            deck: [],
            hitMeDisabled: true,
            standDisabled: true,
            startDisabled: false,
            showModal: false,
            gameOverMessage: "",
            isBust: false
        };
    }
    async createCardsDict() {
        const editedCardsDict = {
            "ASpades":["Spades", 1, "A", "Black", ace_of_spades],
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

            "AClubs": ["Clubs", 1, "A", "Black", ace_of_clubs],
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

            "AHearts":["Hearts", 1, "A", "Red", ace_of_hearts],
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

            "ADiamonds": ["Diamonds", 1, "A", "Red", ace_of_diamonds],
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
    async drawCards(hand, number, key) {
        var editedHand = hand;
        var editedDeck = this.state.deck;
        var editedValue = 0;
        var editedValuesDict = this.state.values;
        for (var uselessVariable = 0; uselessVariable < number; uselessVariable++) {
            // Generate a random card
            var randCardIndex = Math.floor(Math.random() * editedDeck.length - 1);
            var randCard = editedDeck.splice(randCardIndex, 1);
    
            // Add the card to the player's hand
            editedHand.push(randCard[0]);
        }
        var aces = 0;
        for (var i = 0; i < editedHand.length; i++) {
            if (editedHand[i].getName() === "A") {
                // Add to the number of aces to calculate value later.
                aces++;
            }
            else if (editedHand[i].getName() === "K" || editedHand[i].getName() === "Q" || editedHand[i].getName() === "J") {
                // Face cards are worth 10. 
                editedValue += 10;
            }
            else {
                editedValue += editedHand[i].getValue();
            }
        }
        // Now add the value of the aces
        for (var index = 0; index < aces; index++) {
            editedValue += this.getAceValue(editedValue);
            console.log(`inside for loop`)
        }
        console.log(`edited value ${key} after aces loop: ${editedValue}`)

        editedValuesDict[key] = editedValue;
        console.log(`editedValue ${key}: ${editedValue}`)
        this.setState({
            hand: editedHand,
            deck: editedDeck,
            values: editedValuesDict
        }, () => {
            if (this.state.values["playerHandValue"] > 21) {
                this.setState({
                    hitMeDisabled: true,
                    standDisabled: true
                })
                this.whoWon();
            }
            if (this.state.isDealerTurn === true && this.state.values["dealerHandValue"] < 17) {
                this.drawCards(this.state.dealerHand, 1, "dealerHandValue")
            }
            else if (this.state.isDealerTurn === true && this.state.values["dealerHandValue"] >= 17) {
                this.whoWon();
            }
        });
    }
    whoWon() {
        if (this.state.values["playerHandValue"] > 21) {
            this.setState({
                gameOverMessage: "Bust! \n Dealer wins",
                isBust: true
            });
        }
        else if (this.state.values["dealerHandValue"] > 21) {
            this.setState({
                gameOverMessage: "You win! \n Dealer busted"
            });
        }
        else if (this.state.values["playerHandValue"] > this.state.values["dealerHandValue"]) {
            this.setState({
                gameOverMessage: "You win!"
            });
        }
        else if (this.state.values["playerHandValue"] === this.state.values["dealerHandValue"]) {
            this.setState({
                gameOverMessage: "Push"
            });
        }
        else {
            this.setState({
                gameOverMessage: "Dealer wins!"
            });
        }
        this.showModal();
    }
    dealerTurn() {
        this.setState({
            hitMeDisabled: true,
            standDisabled: true,
            isDealerTurn: true
        }, () => {
            this.drawCards(this.state.dealerHand, 1, "dealerHandValue")
        })
    }
    getAceValue(subtotal) {
        // Count the ace as 11 unless that would put your total above 21.
        if (subtotal + 11 <= 21) {
            return 11;
        }
        else {
            return 1;
        }
    }
    showModal() {
        this.setState({ showModal: true });
    };
    hideModal() {
        this.setState({ showModal: false });
    };
    async startGame() {
        await this.createCardsDict();
        await this.createDeck();
        await this.drawCards(this.state.playerHand, 2, "playerHandValue");
        await this.drawCards(this.state.dealerHand, 1, "dealerHandValue");
        this.setState({
            startDisabled: true,
            hitMeDisabled: false,
            standDisabled: false
        })
    }
    displayHand(hand) {
        const listItems = hand.map((card) => <img className="handImage" src={card.getFilepath()} alt={card.getName()}></img>);
        return (
            <div className="cardimages">
            {listItems}
            </div>
        );
    }
    render () {
        return (
            <div id="blackjack" className="blackJack">

                <button disabled={this.state.startDisabled} className="gameHomeBtn" onClick={this.startGame}>Start</button>

                <h1>Dealer Hand:</h1>
                <div className="cardimages">
                    <img id={this.state.isDealerTurn ? "displayNone":"displayBlock"} className="handImage" src={card_back} alt=""></img>
                    {this.displayHand(this.state.dealerHand)}
                </div>

                <h1>Your Hand:</h1>
                {this.displayHand(this.state.playerHand)}

                <button disabled={this.state.hitMeDisabled} id="hitme" className="gameHomeBtn" onClick={this.drawCards.bind(this, this.state.playerHand, 1, "playerHandValue")}>Hit me</button>
                <button disabled={this.state.standDisabled} id="stand" className="gameHomeBtn" onClick={this.dealerTurn}>Stand</button>

                <Modal show={this.state.showModal} handleClose={this.hideModal}>
                    <h2>{this.state.gameOverMessage}</h2>
                    <p>Player score: {this.state.values["playerHandValue"]}</p>
                    <p className={this.state.isBust ? "displayNone":"displayBlock"}>Dealer score: {this.state.values["dealerHandValue"]}</p>
                </Modal>
            </div>
        )
    }
}

export default BlackJackGame
// IDEAS:
// - toggle start button and the rest of the buttons so they can't be pressed out of order. 



// useEffect - 
// dependency array - 
// lifecycle methods: on render?

// display_hand
// hit me and stand buttons need to do something
// put main() code into function ?

// displayCard(card) {
//     var filepath = card.getFilepath();
//     return(
//         <img src={filepath}></img>
//     )
// }