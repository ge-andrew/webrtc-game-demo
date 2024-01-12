import { game } from "../../../lib/game.js"

const newGame = new game("hostPlayer", "guestPlayer")

describe('Game Object Initialization', function(){
    describe('Map', function() {
        it('test map base not traversable at (1,1)', function() {
            chai.assert.equal(false, newGame.map.tiles[1][1].isTraversable)
        })
        it('test correct map base owner at (1,1)', function() {
            chai.assert.equal('hostPlayer', newGame.map.tiles[1][1].contents.owner)
        })
        it('test map base not traversable at (8,8)', function() {
            chai.assert.equal(false, newGame.map.tiles[8][8].isTraversable)
        })
        it('test correct map base owner at (8,8)', function() {
            chai.assert.equal('guestPlayer', newGame.map.tiles[8][8].contents.owner)
        })
    })
    describe('GameState', function() {
        it('turn should start at 1', function() {
            chai.assert.equal(1, newGame.gameState.turn)
        })
        it('test correct host player id', function() {
            chai.assert.equal('hostPlayer', newGame.gameState.hostPlayerId)
        })
        it('test correct guest player id', function() {
            chai.assert.equal('guestPlayer', newGame.gameState.guestPlayerId)
        })
        it('gameIsCompleted is false', function() {
            chai.assert.equal(false, newGame.gameState.gameIsCompleted)
        })
    })
})