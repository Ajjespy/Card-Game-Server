import React from "react";

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            bid: 0,
            points: [],
            hand: [],
            tricksWon: 0
        }
    }
    resetPlayer() {
        this.setState({
            tricksWon: 0
        }, () => {
            console.log("Player reset")
        });
    }
    setBid(bid) {
        this.state.bid = bid;
    }
    getBid() {
        return this.state.bid;
    }
    updatePoints(pointsEarned, currentRound) {
        if (this.state.currentRound < 2) {
            this.state.points.push(pointsEarned);
        }
        else {
            this.state.points.push(pointsEarned + this.state.points[currentRound-2]);
        }
    }
    getPoints() {
        return this.state.points;
    }
    updateHand(hand) {
        this.state.hand = hand;
    }
    getHand() {
        return this.state.hand;
    }
    setTricksWon() {
        this.state.tricksWon += 1;
    }
    getTricksWon() {
        return this.state.tricksWon;
    }
}