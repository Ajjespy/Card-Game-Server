FUNCTION get_card_value(char name) 

	// Return the corresponding value given the name of the card

	SWITCH (name) 

	CASE '2'

		return 2

	CASE '3'

		return 3

	CASE '4'

		return 4

	CASE '5'

		return 5

	CASE '6'

		return 6

	CASE '7'

		return 7

	CASE '8'

		return 8

	CASE '9'

		return 9

	CASE 'T'

		return 10

	CASE 'J'

		return 10

	CASE 'Q'

		return 10

	CASE 'K'

		return 10
	
	return 0


FUNCTION get_ace_value(int subtotal) 

	// Count the ace as 11 unless that would put your total above 21.

	IF (subtotal + 11 <= 21) 

		return 11
	
	ELSE
		return 1
	


FUNCTION get_hand_value(hand)

	int total = 0

	// Track the aces because they will be added at the end
	int aces = 0

	// Traverse the list of cards and display each one and add the value to the total
	FOR (card in hand)

		// Add the value of the card to the total
		IF (card == 'A')
			aces++
		
		ELSE
			total += get_card_value(card)
	
	// Now add the value of the aces
	FOR (int i = 0; i < aces; i++)

		total += get_ace_value(total)
	
	// Return the total
	return total


FUNCTION display_menu()

	PUT "Welcome to Black Jack. Please select an option:"

	PUT "1. Play a game"

	PUT "2. Show me the rules"

	PUT "0. Quit"


FUNCTION display_rules()

	PUT "The point of the game is to get your hand to a total as close to 21 as possible without going over 21."
		"All face cards are worth 10. Aces are worth either 11 or 1, your choice. All other cards are worth their respective values."
		"You play against the dealer. You win if you get closer to 21 than the dealer without going over 21 or if the dealer goes over 21 and you do not."
		"You start the game by getting dealt 2 cards face up in your hand. The dealer also receives 2 cards, one face up and one face down. You can see the dealer's face up card."
		"After the cards are dealt, it is now your turn. On your turn you can either 'hit' (be dealt another card) to attempt to bring your total closer to 21, or you can 'stand' (do not take another card and end your turn)."
		"If you hit and the new card brings your total above 21, you 'bust' (lose immediately)."
		"When you stand on a total less than 21, the dealer then takes his turn."
		"The dealer's face down card is turned up and the dealer then plays."
		"If the dealer's total is 16 or less, he must hit. If the total is 17 or greater, he must stand."
		"The dealer's turn continues until he either busts or stands according to these rules."
		"When the dealer's turn ends and neither player has busted, the player with the total closest to 21 wins the game."


FUNTION display_hand(hand)

	// Traverse the list of cards and display each one and add the value to the total
	FOR (card in hand)

		// Display each card
		PUT card

	// Display the total
	PUT get_hand_value(hand)
}

FUNCTION display_options()

	PUT "1. Hit me"

	PUT "0. Stand"


FUNCTION main()

	// Initialize the selection variable
	int menu_selection = -1

	// Keep showing the menu until the user quits
	while (menu_selection != 0)

		display_menu()

		// Get the user's choice
		GET menu_selection

		// Perform the chosen action
		IF (menu_selection == 2)

			display_rules();
		
		ELSE IF (menu_selection == 1)

			// Start the game
			// Create the deck of cards

			// Deal the initial 2 cards to each player
			// Add 2 cards to the player's hand

				FOR (int i = 0; i < 2; i++)

					deal_card(player)

				
				// Add 2 cards to the dealer's hand
				FOR (int i = 0; i < 2; i++)

					deal_card(dealer)

			// Start the player's turn
			int stand = 1

			int player_bust = 0

			while (stand == 1)

				// Show the dealer's face up card
				 
				// Show the player's hand
				display_hand(player)

				// Show the player's options
				display_options()

				GET stand

				// Give the user another card if they hit
				IF (stand == 1)
					
					deal_card(player)

				// See if the player busts
				IF (get_hand_value(player) > 21)

					display_hand(player)

					// End the player's turn
					stand = 0;

					PUT "Busted! You lose."

					player_bust = 1

			// Take the dealer's turn if the player didn't bust
			int dealer_bust = 0

			IF (player_bust == 0)

				// Show the dealer's hand
				display_hand(dealer)

				// Keep hitting the dealer until at least 17
				WHILE (get_hand_value(dealer) < 17)

					// Hit the dealer
					PUT "The dealer hits"

					deal_card(dealer)

					// Show the dealer's hand
					display_hand(dealer)

				// Check if the dealer busts
				IF (get_hand_value(dealer) > 21)

					dealer_bust = 1

					PUT "The dealer busts! You win!!"
				
				ELSE

					// The dealer stands when he reaches 17 or higher
					PUT "The dealer stands"

			// See who wins
			IF (player_bust == 0)

				if (dealer_bust == 0)

					PUT "Your score: ", get_hand_value(player)

					PUT "Dealer's score: ", get_hand_value(dealer)

					IF (get_hand_value(player) > get_hand_value(dealer))

						PUT "You win! Congratulations!!"
					
					ELSE IF (get_hand_value(player) < get_hand_value(dealer))

						PUT "You lose! Better luck next time."
					
					ELSE

						PUT "It's a draw!"

			// Ask the user if they would like to play again
			PUT "Would you like to play again?"
				"1. Yes"
				"0. No"

			GET menu_selection