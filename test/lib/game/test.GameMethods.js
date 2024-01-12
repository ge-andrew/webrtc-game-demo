import { game } from "../../../lib/game.js"
import { unit }  from "../../../lib/game/mapComp/unit.js"

const newGame = new game("hostPlayer", "guestPlayer")

describe('Game Object Methods', function(){
    describe('isMyTurn(player) and endTurn(player)', function() {
        it('turn should start at 1', function() {
            chai.assert.equal(1, newGame.gameState.turn)
            newGame.endTurn(newGame.guestPlayer)
        })

        it('after ending first turn, now turn 2', function() {
            chai.assert.equal(2, newGame.gameState.turn)
        })
        it('after ending first turn, now host turn', function() {
            chai.assert.equal(true, newGame.isMyTurn(newGame.hostPlayer))
            newGame.guestPlayer.energy = 0
            newGame.endTurn(newGame.guestPlayer)
        })
        it('after ending their turn, guest player energy is refilled by 3', function() {
            chai.assert.equal(3, newGame.guestPlayer.energy)
        })

        it('waiting player cannot increment turn', function() {
            chai.assert.equal(2, newGame.gameState.turn)
        })
        it('waiting player cannot end turn', function() {
            chai.assert.equal(true, newGame.isMyTurn(newGame.hostPlayer))
            newGame.endTurn(newGame.hostPlayer)
        })

        it('after ending second turn, now turn 3', function() {
            chai.assert.equal(3, newGame.gameState.turn)
        })
        it('after ending second turn, now guest turn', function() {
            chai.assert.equal(true, newGame.isMyTurn(newGame.guestPlayer))
        })
    })
    describe('spawnUnit(player, turn, position)', function() {
        it('spawn guestPlayer unit', function() {
            chai.assert.equal(new unit('guestPlayer'), newGame.map.tiles[7][7])
        })
    })
    describe('attack(player, turn, attackerPosition, defenderPosition)', function() {

    })
})