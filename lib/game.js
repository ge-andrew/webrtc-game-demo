class game {
    constructor(hostPlayerId, guestPlayerId) {
        this.hostPlayerId = hostPlayerId
        this.guestPlayerId = guestPlayerId
        this.map = new map(hostPlayerId, guestPlayerId)
        this.gameState = new gameState(hostPlayerId, guestPlayerId)
        this.hostPlayer = new player(hostPlayerId, true)
        this.guestPlayer = new player(guestPlayerId, false)
    }
}