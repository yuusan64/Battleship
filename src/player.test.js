const Player = require('./player');
const GameBoard = require('./gameboard');

describe('Player functionality', () => {
    let player, opponentBoard;
    beforeEach(() => {
        opponentBoard = new GameBoard();
        player = new Player(false, opponentBoard);
    });

    test('Player can make a legal move', () => {
        opponentBoard.placeShip(3, 0, 0, 'horizontal');
        const moveResult = player.makeMove(0, 0, opponentBoard);
        expect(moveResult).toBe(true);
        expect(opponentBoard.ships[0].ship.timesHit).toBe(1);
    });

    test('Player cannot make illegal move', ()=>{
       opponentBoard.placeShip(3,0,0, 'horizontal');
       player.makeMove(0,0,opponentBoard);
       const moveResult = player.makeMove(0,0, opponentBoard);
       expect(moveResult).toBe(false);
    })
});
