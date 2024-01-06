class gameState {
    constructor(hostPlayerId, guestPlayerId) {
        this.turn = 1
        this.hostPlayerId = hostPlayerId
        this.guestPlayerId = guestPlayerId
        this.gameIsCompleted = false
    }
}