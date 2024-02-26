class Player {
    constructor(isComputer = false, gameBoard) {
        this.isComputer = isComputer;
        this.gameBoard = gameBoard; 
        this.pastMoves = new Set(); 
    }

    // Generate unique key for each coordinate
    createCoordKey(x, y) {
        return `${x},${y}`;
    }

    // Check if the move is legal
    isLegalMove(x, y) {
        const key = this.createCoordKey(x, y);
        return !this.pastMoves.has(key);
    }

    // Record a move as made
    recordMove(x, y) {
        const key = this.createCoordKey(x, y);
        this.pastMoves.add(key);
    }

    // Make a move on the specified gameboard
    makeMove(x, y, targetBoard) {
        if (this.isComputer) {
           
            do {
                x = Math.floor(Math.random() * this.gameBoard.size);
                y = Math.floor(Math.random() * this.gameBoard.size);
            } while (!this.isLegalMove(x, y));
        } else {
          
            if (!this.isLegalMove(x, y)) {
                return false; 
            }
        }

        this.recordMove(x, y);
        targetBoard.receiveAttack(x, y);
        return true; 
    }
}

module.exports = Player;