import tile from "mapComp/tile.js";
import unit from "mapComp/unit.js";
import base from "mapComp/base.js";

class map {
    constructor(hostPlayerId, guestPlayerId) {
        this.tiles = tiles[10][10]

        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                tiles[i][j] = new tile(true)
            }
        }

        tiles[1][1].contents = new base(hostPlayerId)
        tiles[8][8].contents = new base(guestPlayerId)
    }
}