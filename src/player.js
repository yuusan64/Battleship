class Player {
    constructor(isComputer = false, gameBoard) {
        this.isComputer = isComputer;
        this.gameBoard = gameBoard; 
        this.pastMoves = new Set(); 
        this.lastHit = null;
        // Store potential cells to hit around a successful hit
        this.potentialTargets = []; 
}


    // Generate coordinates
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

makeMove(x, y, targetBoard) {
    if (this.isComputer) {
        // Check if there are any potential targets from previous hits
        if (this.potentialTargets.length > 0) {
            ({ x, y } = this.potentialTargets.shift()); // Take the next potential target
        } else {
            // No potential targets, so choose randomly
            do {
                x = Math.floor(Math.random() * this.gameBoard.size);
                y = Math.floor(Math.random() * this.gameBoard.size);
            } while (!this.isLegalMove(x, y));
        }
    } else {
        // Player logic remains unchanged
        if (!this.isLegalMove(x, y)) {
            return { legal: false };
        }
    }

    this.recordMove(x, y);
    const attackResult = targetBoard.receiveAttack(x, y);

    // Update the last hit and potential targets if this was a hit
    if (attackResult.hit) {
        this.lastHit = { x, y };
        this.updatePotentialTargets(x, y);
    }

    return { ...attackResult, legal: true };
}

updatePotentialTargets(x, y) {
    // Add adjacent cells as potential targets, ensuring they are within bounds and not already attempted
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // Up, Right, Down, Left
    directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < this.gameBoard.size && newY >= 0 && newY < this.gameBoard.size) {
            if (!this.pastMoves.has(this.createCoordKey(newX, newY))) {
                this.potentialTargets.push({ x: newX, y: newY });
            }
        }
    });
}
    
}
    



module.exports = Player;