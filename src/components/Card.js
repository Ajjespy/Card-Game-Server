import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suit: "",
            value: 0,
            color: "",
            name: "",
            filepath: ""
        };
    }
    setSuit(suit) {
        this.state.suit = suit;
    }
    getSuit() {
        return(this.state.suit)
    }
    setValue(value) {
        this.state.value = value;
    }
    getValue() {
        return(this.state.value)
    }
    setColor(color) {
        this.state.color = color;
    }
    getColor() {
        return(this.state.color)
    }
    setName(name) {
        this.state.name = name;
    }
    getName() {
        return(this.state.name)
    }
    setFilepath(filepath) {
        this.state.filepath = filepath;
    }
    getFilepath() {
        return(this.state.filepath)
    }


    render() {
        return (
            <div>
                <p>{this.state.suit}</p>
            </div>
        )
    }
}
export default Card