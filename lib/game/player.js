export class player {
    constructor(playerId, isHost) {
        this.playerId = playerId
        this.isHost = isHost
        this.energy = 5
    }

    refillEnergy() {
        this.energy = this.energy + 3
        if (this.energy > 5) {
            this.energy = 5
        }
    }
}