// whoWon() - S
// Trump cards/highest within suit (aces?)
// Determine who had the highest ranking card in the trick
// Order of current playerQueue[] = order of pile[]
// Temporary list of winning suit (check for trump first and then check for cards that match the suit of the first card)
// Who won the last trick (return value)

import React from "react";
import Modal from './Modal.js';
import Card from "./components/Card";
import Player from "./components/Player";
import "./App.css";
import "./ohheavens.css";
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
            playerQueue: [],
            playerList: [],
            scoreboard: [],
            pile: [],
            currentRound: 0,
            numberOfCards: 7,
            gameWinner: [100, "Joe"],
            showModal: false
        }
        this.createCardsDict = this.createCardsDict.bind(this);
        this.createDeck = this.createDeck.bind(this);
        this.drawCards = this.drawCards.bind(this);
        this.resetRound = this.resetRound.bind(this);
        this.canPlayCard = this.canPlayCard.bind(this);
        this.whoWonTrick = this.whoWonTrick.bind(this);
        this.updateTricksWon = this.updateTricksWon.bind(this);
        this.playGame = this.playGame.bind(this);
        this.numberOfCards = this.numberOfCards.bind(this);
        this.determineWinner = this.determineWinner.bind(this);
        this.calculatePoints = this.calculatePoints.bind(this);
        this.whoStartsTrick = this.whoStartsTrick.bind(this);
        this.askBid = this.askBid.bind(this);
        this.playCard = this.playCard.bind(this);
        this.updateDealerQueue = this.updateDealerQueue.bind(this);
        this.displayDeck = this.displayDeck.bind(this);
        this.displayAllHands = this.displayAllHands.bind(this);
    }
    async playGame() {
      await this.createPlayers();
      await this.createCardsDict();
      await this.createDeck();

      // GAME LOOP
      // 13 is for the various rounds with hands of 7 down to 1, then back up to 7.
      for (var i = 1; i <= 13; i++) {
        let handSize = this.numberOfCards(i);
        await this.drawCards(handSize);
        for (var k = 0; k < this.state.playerList.length; k++) {
            console.log(`${this.state.playerList[k].getName()}'s Hand:`)
            this.state.playerList[k].getHand().forEach((card) => {
                console.log(card)
            })
            // Display a hand, not a deck.
            // this.displayDeck(this.state.playerList[i].getHand())
        }
        this.askBid(handSize); 

        // Play a trick.
        for (var j = 1; j <= handSize; j++) {

            // Each player plays a card.
            this.state.playerQueue.forEach(function (player) {
                this.canPlayCard(player);
                let cardIndex; // figure out how to pause until user input/get user input and store chosen card
                this.playCard(player, cardIndex);
            });

            // Calculate the winning player and set them to start the next trick.
            let winningPlayer = this.whoWonTrick();
            this.updateTricksWon(winningPlayer);
            this.whoStartsTrick(winningPlayer);
        }

        // Score points and start the next round.
        this.calculatePoints();
        this.resetRound();
      }
      this.determineWinner(); 
      this.endGameDisplay(); //Args? - needs to be made
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
    // Update to go to each player or set as a forEach(), Args
    async drawCards(number) {
        for (var i = 0; i < this.state.playerList.length; i++) {
            var tempHand = this.state.playerList[i].getHand();
            var tempDeck = this.state.deck;
            for (var j = 0; j < number; j++) {
                // Generate a random card
                var randCardIndex = Math.floor(Math.random() * tempDeck.length - 1);
                var randCard = tempDeck.splice(randCardIndex, 1);

                // Add the card to the player's hand
                tempHand.push(randCard[0]);
            }
            this.state.playerList[i].setHand(tempHand);
            this.setState({
                deck: tempDeck
            }, () => {
                console.log(`updated deck`)
            });
        }
    }
    // Temporary player list for testing until we figure out the server
    async createPlayers() {
        var usernames = ["Joe", "Bob", "Sally", "Rachel"]
        var tempPlayerList = this.state.playerList;
        for (var i = 0; i < usernames.length; i++) {
            var player = new Player();
            player.setName(usernames[i]);
            console.log(player.getName());
            tempPlayerList.push(player);
        }
        this.setState({
            playerList: tempPlayerList,
            dealerQueue: tempPlayerList
        }, () => {
            console.log("finished creating players")
        });
    }
    resetRound() {
        var tempPlayerList = this.state.playerList
        tempPlayerList.forEach((player) => {
            player.resetPlayer();
        })
        this.setState({
            deck: [],
            pile: []
        }, () => {
            this.createDeck();
            this.numberOfCards();
            this.drawCards();            
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
        return (validCards, invalidCards)
    }
    whoWonTrick() {
        // pull trump cards if any
        // highest trump card = winner
        // else highest of first suit = winner
        var pile = this.state.pile;
        var firstCardSuit = this.state.pile[0].getSuit();
        var trumpSuitCards = [0, null];
        var originalSuitCards = [0, null];
        var winningPlayer;
        for (var i = 0; i < pile.length; i++) {
            if (pile[i].getSuit() === this.state.trumpSuit) {
                if (pile[i].getValue() > trumpSuitCards[0]) {
                    trumpSuitCards.push(pile[i], this.state.playerQueue[i]);
                }
            }
            else if (pile[i].getSuit() === firstCardSuit) {
                if (pile[i].getValue() > originalSuitCards[0]) {
                    originalSuitCards.push(pile[i], this.state.playerQueue[i])
                }
            }
        }
        if (trumpSuitCards.length > 0) {
            winningPlayer = trumpSuitCards[1];
        }
        else {
            winningPlayer = originalSuitCards[1];
        }

        return winningPlayer;
    }
    numberOfCards(round){ //done but not tested
        if (round < 8){
            return 8 - round
        }
        else {
            return round - 6
        }
    }
    determineWinner() { // Testing required
        let max = (0, null)
        let tlist = this.state.playerList
        tlist.forEach(function (player) {
            let values = player.getPoints()
                if (max[0] < values[-1]) {
                    max = (values[-1], player.getName())
                }
        })
        this.setState({
            gameWinner: max
        }, () => {
            //add something here later if needed
        })
    }
    calculatePoints(){ // Testing required
        let pointsEarned
        let tlist = this.state.playerList
        for (var player in tlist){
            if (player.tricksWon === player.bid){
                pointsEarned = player.bid + 10
            }
            else {
                pointsEarned = -10
            }
            player.updatePoints(pointsEarned)
        }
    }
    whoStartsTrick(player) { // Testing required
        let temp
        let pqueue = this.state.playerQueue
        while (pqueue[0] !== player){
            temp = pqueue.shift()
            pqueue.push(temp)
        }
        this.setState({
            playerQueue: pqueue
        }, () => {
            //add something here later if needed
        })
    }
    askBid(handSize){ //render buttons for bid options, figure out user input from buttons and waiting for them - playerQueue => dealerQueue?
        let maxBid
        let maxPlayer
        let totalBid
        let bidOptions = [];
        this.updateDealerQueue()
        let tdqueue = this.state.dealerQueue
        for (var i = 1; i <= tdqueue.length; i++){
            for (var j = 0; j <= handSize; j++){
                // j + 1?
                bidOptions.push(j)
            }
            if (i === tdqueue.length) {
                let badBid = handSize - totalBid
                if (badBid >= 0 &&  badBid <= handSize){
                    bidOptions.splice(badBid)
                }
            }
            //Render buttons through array maybe? (pass in bidOptions)
            let tempBid = 1; // get tempBid from user input/wait for that input *?*
            tdqueue[i].setBid(tempBid)
            totalBid += tempBid
            if (maxBid < tempBid){
                maxBid = tempBid
                maxPlayer = tdqueue[i]
            }
        }
        this.whoStartsTrick(maxPlayer)
        
    }
    playCard(player, cardIndex){ // Testing required
        let tempile = this.state.pile
        let temphand = player.getHand()
        let card = temphand.splice(cardIndex)
        tempile.push(card)
        this.setState({
            pile: tempile
        }, () => {
            player.updateHand(temphand)
        })
    }
    updateDealerQueue(){ // Testing required
        let dqueue = this.state.dealerQueue
        let temp = dqueue.shift()
        dqueue.push(temp)
        this.setState({
            dealerQueue: dqueue
        }, () => {
            //add something here later if needed
        })
    }
    // should this just be part of whoWonTrick()?
    updateTricksWon(winningPlayer) {
        winningPlayer.setTricksWon();
    }
    displayDeck(deck) {
        const listItems = deck.map((card) => <img className="handImage" src={card.getFilepath()} alt={card.getName()}></img>);
        console.log("in display deck function")
        return (
            <div className="cardimages">
            {listItems}
            </div>
        );
    }
    showModal() {
        this.setState({ showModal: true });
    };
    hideModal() {
        this.setState({ showModal: false });
    };
    render() {
        return (
            <div className="ohHeavens">
                <h1>Oh Heavens</h1>
                {/* {this.displayDeck(this.state.deck)} */}
                {/* {this.displayAllHands()} */}
                {/* {this.displayDeck(this.state.playerList[0].getHand())} */}
                <button onClick={this.playGame}>Start</button>

                <Modal show={this.state.showModal} handleClose={this.hideModal}> 
                    {/* edit endgame screen */}
                    <h2>{this.state.gameWinner[1]} Wins!</h2>
                    <p>Points: {this.state.gameWinner[0]}</p>
                    
                </Modal>
                
                {/* <Link to="/OhHeavens.js"><button className="gameHomeBtn" type="button" onClick={this.hideModal()}>Play Again</button></Link> */}
            </div>
        )
    }
}
export default OhHeavens