function playGame(){ // Set to start button
    createCardsDict() // Args?
    createDeck() // Args?
    for (i = 1; i <= 13; i++){ //GAME
        let handSize = numberOfCards(i)
        drawCards(handSize) //Maybe done, might need updating to go to each player or set as a forEach(), Args?
        askBid(handSize) // Not done, Args?
        for (j = 1; j <= handSize; j++){ // ROUND
            playerQueue.forEach(function(player){ // TRICK
                canPlayCard(player)
                let cardIndex //figure out how to pause until user input/get user input and store chosen card
                playCard(player, cardIndex)
            })
            let winningPlayer = whoWon() // Args?
            updateTricksWon(winningPlayer)
            whoStartsTrick(winningPlayer)
        }
        calculatePoints() //
        resetRound() //Args? forEach?
    }
    determineWinner() // Need to set to value or change to update global value
    endGameDisplay() //Args?
}

function numberOfCards(round){ //done but not tested
    if (round < 8){
        return 8 - round
    }
    else {
        return round - 6
    }
}

function determineWinner() { // Testing required, ask about variable or state
    let max = (0, null)
    let tlist = this.state.playerList
    tlist.forEach(function (player){
        if (max[0] < player.points[-1]){
            max = (player.points[-1], player)
        }
    })
    this.setState({
        gameWinner: max[1]
    }, () => {
        //add something here later if needed
    })
}

function calculatePoints(){ // Testing required
    let pointsEarned
    let tlist = this.state.playerList
    for (player in tlist){
        if (player.tricksWon === player.bid){
            pointsEarned = player.bid + 10
        }
        else {
            pointsEarned = -10
        }
        player.updatePoints(pointsEarned)
    }
}

function whoStartsTrick(player) { // Testing required
    let temp
    let pqueue = this.state.playerQueue
    while (pqueue[0] != player){
        temp = pqueue.shift()
        pqueue.push(temp)
    }
    this.setState({
        playerQueue: pqueue
    }, () => {
        //add something here later if needed
    })
}

function askBid(handSize){ //render buttons for bid options, figure out user input from buttons and waiting for them - playerQueue => dealerQueue?
    let maxBid
    let maxPlayer
    let totalBid
    let bidOptions
    updateDealerQueue()
    let tdqueue = this.state.dealerQueue
    for (i = 1; i <= tdqueue.length; i++){
        for (i = 0; i <= handSize; i++){
            bidOptions.push(i)
        }
        if (i = tdqueue.length){
            let badBid = handSize - totalBid
            if (badBid >= 0 &&  badBid <= handSize){
                bidOptions.splice(badBid)
            }
        }
        //Render buttons through array maybe? (pass in bidOptions)
        let tempBid // get tempBid from user input/wait for that input *?*
        tdqueue[i].setBid(tempBid)
        totalBid += tempBid
        if (maxBid < tempBid){
            maxBid = tempBid
            maxPlayer = tdqueue[i]
        }
    }
    whoStartsTrick(maxPlayer)
}

function playCard(player, cardIndex){ // Testing required
    let tempile = this.state.pile
    let temphand = player.getHand()
    let card = temphand.splice(cardIndex)
    tempile.push(card)
    this.setState({
        pile: tempile
    }, () => {
        //add something here later if needed
    })
    player.updateHand(temphand)
}

function updateDealerQueue(){ // Testing required
    let dqueue = this.state.dealerQueue
    let temp = dqueue.shift()
    dqueue.push(temp)
    this.setState({
        dealerQueue: dqueue
    }, () => {
        //add something here later if needed
    })
}