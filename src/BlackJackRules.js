function BlackJackRules() {
    return (
        <div>
            <h1>Black Jack Rules</h1>
            <div className="rules">
                <p>The point of the game is to get your hand to a total as close to 21 as possible without going over 21.</p>
                <p>All face cards are worth 10. Aces are worth either 11 or 1, your choice. All other cards are worth their respective values.</p>
                <p>You play against the dealer. You win if you get closer to 21 than the dealer without going over 21 or if the dealer goes over 21 and you do not.</p>
                <p>You start the game by getting dealt 2 cards face up in your hand. The dealer also receives 2 cards, one face up and one face down. You can see the dealer's face up card.</p>
                <p>After the cards are dealt, it is now your turn. On your turn you can either 'hit' (be dealt another card) to attempt to bring your total closer to 21, or you can 'stand' (do not take another card and end your turn).</p>
                <p>If you hit and the new card brings your total above 21, you 'bust' (lose immediately).</p>
                <p>When you stand on a total less than 21, the dealer then takes his turn.</p>
                <p>The dealer's face down card is turned up and the dealer then plays.</p>
                <p>If the dealer's total is 16 or less, he must hit. If the total is 17 or greater, he must stand.</p>
                <p>The dealer's turn continues until he either busts or stands according to these rules.</p>
                <p>When the dealer's turn ends and neither player has busted, the player with the total closest to 21 wins the game.</p>
            </div>
        </div>
    )
}
export default BlackJackRules