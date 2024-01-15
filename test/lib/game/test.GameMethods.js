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
            newGame.endTurn(newGame.guestPlayer)        // invalid, should fail
        })

        it('waiting player cannot increment turn', function() {
            chai.assert.equal(2, newGame.gameState.turn)
        })
        it('waiting player cannot end turn', function() {
            chai.assert.equal(true, newGame.isMyTurn(newGame.hostPlayer))
            newGame.hostPlayer.energy = 0
            newGame.endTurn(newGame.hostPlayer)         // valid, ends turn
        })

        it('after ending second turn, now turn 3', function() {
            chai.assert.equal(3, newGame.gameState.turn)
        })
        it('after ending second turn, now guest turn', function() {
            chai.assert.equal(true, newGame.isMyTurn(newGame.guestPlayer))
        })
        it('after ending turn guest energy should replenish by 3 after being set to 0', function() {
            chai.assert.equal(3, newGame.hostPlayer.energy)
        })
    })
    describe('spawnUnit(player, turn, position)', function() {
        it('spawn guestPlayer unit', function() {
            newGame.spawnUnit(newGame.guestPlayer, [7,7])
            chai.assert.deepEqual(new unit('guestPlayer'), newGame.map.tiles[7][7].contents)
        })
        it('energy is deducted by 2 when player spawns unit', function() {
            chai.assert.equal(newGame.guestPlayer.energy, 3)
        })
        it('restrict spawn to around base of correct player', function() {
            chai.assert.isNull(x, null)
        })
    })
    describe('attack(player, turn, attackerPosition, defenderPosition)', function() {

    })
})