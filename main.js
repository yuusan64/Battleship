const GameBoard = require('./GameBoard');
const Player = require('./Player');

// Initialize game boards
const humanBoard = new GameBoard();
const computerBoard = new GameBoard();

// Initialize players
const humanPlayer = new Player(false, humanBoard);
const computerPlayer = new Player(true, computerBoard);