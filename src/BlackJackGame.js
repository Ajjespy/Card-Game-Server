import React from "react";
import Card from "./components/Card";
import "./App.css";
import "./blackJack.css";
import {
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
} from "./cardimages/CardImages";

const SUIT_INDEX = 0;
const VALUE_INDEX = 1;
const COLOR_INDEX = 2;
const NAME_INDEX = 3;
const FILEPATH_INDEX = 4;

class BlackJackGame extends React.Component{
    constructor(props) {
        super(props)
        this.get_ace_value = this.get_ace_value.bind(this);
        this.get_hand_value = this.get_hand_value.bind(this);
    }
    createCardsDict() {
        const cardsDict = {
            "ASpades":["Spades", 1, "Black", "A", ace_of_spades],
            "2Spades":["Spades", 2, "Black", "2", two_of_spades],
            "3Spades":["Spades", 3, "Black", "3", three_of_spades],
            "4Spades":["Spades", 4, "Black", "4", four_of_spades],
            "5Spades":["Spades", 5, "Black", "5", five_of_spades],
            "6Spades":["Spades", 6, "Black", "6", six_of_spades],
            "7Spades":["Spades", 7, "Black", "7", seven_of_spades],
            "8Spades":["Spades", 8, "Black", "8", eight_of_spades],
            "9Spades":["Spades", 9, "Black", "9", nine_of_spades],
            "10Spades":["Spades", 10, "Black", "10", ten_of_spades],
            "JSpades":["Spades", 11, "Black", "J", jack_of_spades],
            "QSpades":["Spades", 12, "Black", "Q", queen_of_spades],
            "KSpades":["Spades", 13, "Black", "K", king_of_spades],

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
        return cardsDict;
    }
    createDeck(cardsDict) {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
        var deck = [];
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < suits.length; j++) {
                var key = values[i] + suits[j];
                var card = new Card();
                card.setSuit(cardsDict[key][SUIT_INDEX]);
                card.setValue(cardsDict[key][VALUE_INDEX]);
                card.setColor(cardsDict[key][COLOR_INDEX]);
                card.setName(cardsDict[key][NAME_INDEX]);
                card.setFilepath(cardsDict[key][FILEPATH_INDEX]);
                deck.push(card);
            }
        }
        return deck;
    }
    // needs edits
    draw_cards(deck, hand, number) {
        for (var i = 0; i < number; i++) {
            // Generate a random card
            var rand_card = deck[Math.floor(Math.random() * 52)];
    
            // Add the card to the player's hand
            hand.push(rand_card);
        }
    }
    get_ace_value(subtotal) {
        // Count the ace as 11 unless that would put your total above 21.
        if (subtotal + 11 <= 21) {
            return 11;
        }
        else {
            return 1;
        }
    }
    get_hand_value(hand) {
        var total = 0;
        // Track the aces because they will be added at the end
        var aces = 0;
    
        // Traverse the list of cards and display each one and add the value to the total
        for (var i = 0; i < hand.length; i++) {
            // Add the value of the card to the total
            if (hand[i]["value"] === 'A') {
                aces++;
            }
            else {
                total += this.get_card_value(hand[i]["value"]);
            }
        }
        // Now add the value of the aces
        for (var index = 0; index < aces; index++) {
            total += this.get_ace_value(total);
        }
        // Return the total
        return total;
    }
    // display_hand
    // hit me and stand buttons need to do something
    // put main() code into function
    director() {

    } 
    render () {
        var cardsDict = this.createCardsDict();
        var deck = this.createDeck(cardsDict);
        return (
            <div id="blackjack">
                <p id="deck">deck</p>
                <p id="hand">hand</p>
                {/* dynamic alt text */}
                <img src={deck[0].getFilepath()} className="cardimg"></img>
                <button id="hitme" class="gameHomeBtn">Hit me</button>
                <button id="stand" class="gameHomeBtn">Stand</button>
            </div>
        )
    }
}

export default BlackJackGame
// useEffect - 
// dependency array - 
// lifecycle methods: on render?