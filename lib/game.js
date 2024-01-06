import {map} from "./game/map.js";
import {gameState} from "./game/gameState.js";
import {player} from "./game/player.js";

class game {
    constructor(hostPlayerId, guestPlayerId) {
        this.map = new map(hostPlayerId, guestPlayerId)
        this.gameState = new gameState(hostPlayerId, guestPlayerId)
        this.hostPlayer = new player(hostPlayerId, true)
        this.guestPlayer = new player(guestPlayerId, false)
    }

    endTurn() {
        this.gameState.turn++
        // refill energy of next player
        console.log("Turn ended.")
    }

    spawnUnit(turn, position) {
        if (turn % 2 == 1) {
            // spawn unit on tile for host
            // deduct energy
        }
        else {
            // spawn unit on tile for guest
            // deduct energy
        }
    }

    attack(turn, attackerPosition, defenderPosition) {
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
