Define CLASS for "card"

    Assign attributes 
    "number", "suit" on init

Create "Master+Deck"

    (Stored or initialized?)
        Stored takes more space, initialize takes more time
    if initialize:
        Master_Deck ← Empty array
        suits ← ("spade", "heart", "club", "diamond")
        FOR LOOP x in suits
            FOR i in range(1-13)
                Master_Deck ← card(i, x)
    return Master_Deck

def Shuffle (Master_Deck)

    (can work with any size deck if only a discard pile must be shuffled and added)
    shuffled_deck ← new stack
    proxy_deck ← Master_Deck data   (Only if not doing so will destroy the master deck)
        WHILE length(proxy_deck) > 0
            x ← rand int between 1 and lenth(proxy_deck)
            shuffled deck ← push xth card in proxy_deck
            remove xth card from proxy_deck

def Deal (shuffled_deck, number_of_cards)
    
    cards_to_deal ← empty array
    if len(shuffled_cards) >= number_of_cards
        FOR i in range(number_of_cards)
            cards_to_deal ← pop shuffeld_deck