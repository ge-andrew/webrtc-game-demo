import {map} from "./game/map.js";
import {gameState} from "./game/gameState.js";
import {player} from "./game/player.js";

export class game {
    constructor(hostPlayerId, guestPlayerId) {
        this.map = new map(hostPlayerId, guestPlayerId)
        this.gameState = new gameState(hostPlayerId, guestPlayerId)
        this.hostPlayer = new player(hostPlayerId, true)
        this.guestPlayer = new player(guestPlayerId, false)
    }

    isMyTurn(player) {
        if(this.gameState.turn % 2 == 1) {
            var isGuest = !player.isHost
            return isGuest
        }
        else {
            return player.isHost
        }
    }

    endTurn(player) {
        if(!this.isMyTurn(player)) {
            console.log("Cannot end turn of wrong player.")
            return
        }
        if(player.isHost) {
            this.hostPlayer.refillEnergy()
        }
        else {
            this.guestPlayer.refillEnergy()
        }
        this.gameState.turn++
        console.log("Turn ended.")
    }

    spawnUnit(player, position) {
        if(!this.isMyTurn(player)) {
            console.log("Cannot take actions when not player turn.")
            return
        }
        if(player.energy < 2) {
            console.log("Insufficient energy.")
            return
        }
        let spawnSuccess = this.map.spawnUnit(player, position)
        if(spawnSuccess) {
            if(player.isHost) {
                this.hostPlayer.energy = this.hostPlayer.energy - 2
            }
            else {
                this.guestPlayer.energy = this.guestPlayer.energy - 2
            }
        }
    }

    attack(player, turn, attackerPosition, defenderPosition) {
        if(!this.isMyTurn(player)) {
            return
        }
        if (turn % 2 == 1) {
            // attack unit and deduct health 
            // remove unit if dead
            // deduct energy
        }
        else {
            // attack unit and deduct health 
            // remove unit if dead
            // deduct energy
        }
    }
}

// const newGame = new game("A","J")
// console.log(newGame.map)
// console.log(newGame.map.tiles[1][2])
