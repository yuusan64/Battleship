export const renderBoard = (gameBoard, elementId) => {
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = '';
    boardElement.style.display = 'grid';
    boardElement.style.gridTemplateColumns = `repeat(${gameBoard.size}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${gameBoard.size}, 1fr)`;

    // Create cells for the board
    for (let y = 0; y < gameBoard.size; y++) {
        for (let x = 0; x < gameBoard.size; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.gridColumnStart = x + 1;
            cell.style.gridRowStart = y + 1;
            boardElement.appendChild(cell);
        }
    }

    // Render ships on the player's board
    if (elementId === 'player-board') {
        gameBoard.ships.forEach(ship => {
            ship.positions.forEach(position => {
                const index = position.y * gameBoard.size + position.x;
                if (index >= 0 && index < boardElement.children.length) {
                    const cell = boardElement.children[index];
                    if (cell) {
                        cell.classList.add('ship');
                    }
                }
            });
        });
    }

    // Render hits and misses for both boards
    gameBoard.ships.forEach(ship => {
        ship.positions.forEach(position => {
            const index = position.y * gameBoard.size + position.x;
            if (index >= 0 && index < boardElement.children.length) {
                const cell = boardElement.children[index];
                if (cell && ship.ship.isHit(position)) {
                    cell.classList.add('hit'); 
                }
            }
        });
    });

    gameBoard.missedAttacks.forEach(miss => {
        const index = miss.y * gameBoard.size + miss.x;
        if (index >= 0 && index < boardElement.children.length) {
            const cell = boardElement.children[index];
            if (cell) {
                cell.classList.add('miss'); 
            }
        }
    });
};


export const setAttackListener = (player, onAttack, isGameOver)=>{
    const boardElement = document.getElementById('computer-board');
    boardElement.addEventListener('click', event=>{
        if (isGameOver) return;
        const cell = event.target;
        //Ignore if not clicking on a cell
        if(!cell.classList.contains('cell')) return;

        const x = parseInt(cell.style.gridColumnStart, 10) -1;
        const y= parseInt(cell.style.gridRowStart, 10) -1;

        if(player.isLegalMove(x,y)){
            onAttack(x,y);
        }else{
            alert("Invalid move or already attacked")
        }
    });
}


export const initializeShipPlacement = (gameBoard, elementId, shipSizes, getOrientation, updateInstructions) => {
    const boardElement = document.getElementById(elementId);
    let currentShipIndex = 0; 

    boardElement.addEventListener('click', event => {
        
         // If not a cell, ignore the click
        if (!event.target.classList.contains('cell')) {
            return;
        }
        const orientation = getOrientation();
        const x = parseInt(event.target.style.gridColumnStart, 10) - 1;
        const y = parseInt(event.target.style.gridRowStart, 10) - 1;

        if (currentShipIndex < shipSizes.length && gameBoard.canPlaceShip(shipSizes[currentShipIndex], x, y, orientation)) {
            gameBoard.placeShip(shipSizes[currentShipIndex], x, y, orientation);
            renderBoard(gameBoard, elementId);
            // Increment the index for the next ship
            currentShipIndex++; 
            // Update the ship placement instructions
            updateInstructions(currentShipIndex); 
            
            if (currentShipIndex === shipSizes.length) {
                // Enable start game button & hide orientation buttons
                document.getElementById('start-game-btn').disabled = false; 
                document.getElementById('ship-placement-controls').style.display = 'none'; 
            }
        }
    });
};