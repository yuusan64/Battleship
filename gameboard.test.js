const GameBoard = require('./gameboard');
const Ship = require('./ship');

describe('GameBoard functionality', () => {
    let board;
    beforeEach(() => {
        board =new GameBoard();
    });

    test('Can place a ship at specific coordinates', () => {
        board.placeShip(3, 0, 0, 'horizontal');
        expect(board.ships.length).toBe(1);
        expect(board.ships[0].positions).toEqual([{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]);
    });

    test('receiveAttack hits a ship', () => {
        board.placeShip(3, 0, 0, 'horizontal');
        board.receiveAttack(0, 0);
        expect(board.ships[0].ship.timesHit).toBe(1);
    });

    test('receiveAttack records a missed shot', () => {
        board.receiveAttack(0, 0);
        expect(board.missedAttacks).toContainEqual({x: 0, y: 0});
    });

    test('areAllShipsSunk returns false when not all ships are sunk', () => {
        board.placeShip(3, 0, 0, 'horizontal');
        expect(board.areAllShipsSunk()).toBe(false);
    });

    test('areAllShipsSunk returns true when all ships are sunk', () => {
        board.placeShip(1, 0, 0, 'horizontal');
        board.receiveAttack(0, 0);
        expect(board.areAllShipsSunk()).toBe(true);
    });
});
