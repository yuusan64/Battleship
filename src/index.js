import GameBoard from './gameboard';
import Player from './player';
import { renderBoard, setAttackListener, initializeShipPlacement } from './domController';
import './style.css';


let isGameOver = false;
const shipSizes = [5, 4, 3, 3, 2];
let currentOrientation = 'horizontal';
const shipsToPlace = [
    { name: "Carrier", size: 5 },
    { name: "Battleship", size: 4 },
    { name: "Submarine", size: 3 },
    { name: "Cruiser", size: 3 },
    { name: "Destroyer", size: 2 },
];
let currentShipIndex = 0;


// Initialize game boards and players
const humanBoard = new GameBoard();
const computerBoard = new GameBoard();
const humanPlayer = new Player(false, humanBoard);
const computerPlayer = new Player(true, computerBoard);

computerBoard.placeRandomShips(shipSizes);


//update ship placement instructions
function updateShipPlacementInstructions(currentShipIndex) {
    const instructionElement = document.getElementById('ship-placement-instructions');
    if (currentShipIndex < shipsToPlace.length) {
        const currentShip = shipsToPlace[currentShipIndex];
        instructionElement.textContent = `Place ${currentShip.name} (${currentShip.size} blocks)`;
    } else {
        instructionElement.textContent = "All ships placed";
    }
}

//handle player attacks
const onPlayerAttack = (x,y) =>{
    const attackResult= humanPlayer.makeMove(x, y, computerBoard);
    // Re-render to show the attack result

  if(!attackResult.legal){
    alert("Invalid move or already attacked");
    return;
  }

  renderBoard(computerBoard, 'computer-board');


    if(computerBoard.areAllShipsSunk()){
        alert('Player wins!');
        document.getElementById('computer-board').classList.add('no-click');
        isGameOver = true; 
        return;

    } else{
       
        setTimeout(()=>{
            const {x: compX, y: compY} = computerPlayer.makeMove(x, y, humanBoard);
            renderBoard(humanBoard, 'player-board'); 

          if (humanBoard.areAllShipsSunk()) {
                alert('Computer wins!');
                document.getElementById('computer-board').classList.add('no-click');
                isGameOver = true; 
                return;
            }
        }, 1000);
    }
}

renderBoard(humanBoard, 'player-board');
updateShipPlacementInstructions(currentShipIndex);


//Orientation button event listeners
document.getElementById('horizontal-btn').addEventListener('click', function(){
     currentOrientation = 'horizontal';
     this.classList.add('selected');
     document.getElementById('vertical-btn').classList.remove('selected')
});

document.getElementById('vertical-btn').addEventListener('click', function(){
    currentOrientation = 'vertical';
    this.classList.add('selected');
    document.getElementById('horizontal-btn').classList.remove('selected')
});


// Start disabled
document.getElementById('start-game-btn').disabled = true; 

//Start game button event listener
document.getElementById('start-game-btn').addEventListener('click', function() {
    if (this.textContent === 'Start Game') {
        // Game starting logic
        renderBoard(humanBoard, 'player-board');
        renderBoard(computerBoard, 'computer-board');
        setAttackListener(humanPlayer, onPlayerAttack, isGameOver);
        // Hide ship placement UI or indicate game start
        this.textContent = 'Restart'; // Change the button text to 'Reset Game'
        document.querySelector('.game-container').classList.add('game-started');
        document.getElementById('ship-placement-instructions').textContent="";
        document.getElementsByClassName('computer-board-container')[0].style.opacity="1";

    } else {
        // Reset game logic
        location.reload(); 
    }
});


//Ship placement initialization
initializeShipPlacement(humanBoard, 'player-board', shipSizes, () => currentOrientation, updateShipPlacementInstructions, () => {
    document.getElementById('start-game-btn').disabled = false;
    document.getElementById('ship-placement-controls').style.display = 'none';
});

