const Ship=require('./ship');

class GameBoard{

    constructor(size = 10){
        this.size=size;
        this.ships=[];
        this.missedAttacks=[];
    }

    placeShip(length, x, y, orientation){
        const newShip=new Ship(length);
        let positions=[];

        //calculate ship position based on orientation

        for(let i=0; i<length; i++){
            if(orientation === 'horizontal'){
                positions.push({x: x+i, y:y })
            }else if(orientation === 'vertical'){
                positions.push({x:x, y:y+i});
            }
        }

        //add new ship and its positions to ships array

        this.ships.push({ship: newShip, positions: positions});

    }

    placeRandomShips(shipSizes) {
        shipSizes.forEach(size => {
            let placed = false;
            while (!placed) {
                // Randomly select orientation
                const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                // Randomly select the starting position
                const x = Math.floor(Math.random() * this.size);
                const y = Math.floor(Math.random() * this.size);
    
                // Check if the ship can be placed
                if (this.canPlaceShip(size, x, y, orientation)) {
                    this.placeShip(size, x, y, orientation);
                    placed = true;
                }
            }
        });
    }

    canPlaceShip(length, x, y, orientation) {
        // Check if ship is within bounds and doesn't overlap with existing ships
        for (let i = 0; i < length; i++) {
            const xi = orientation === 'horizontal' ? x + i : x;
            const yi = orientation === 'vertical' ? y + i : y;
    
            // Check bounds
            if (xi >= this.size || yi >= this.size) return false;
    
            // Check overlap
            for (const shipEntry of this.ships) {
                for (const pos of shipEntry.positions) {
                    if (pos.x === xi && pos.y === yi) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    receiveAttack(x, y) {

        let attackResult = { hit: false, sunk: false, miss: false };
    
        for (const shipEntry of this.ships) {
            for (const position of shipEntry.positions) {
                if (position.x === x && position.y === y) {
                    shipEntry.ship.hit(position);
                    attackResult.hit = true;
                    if (shipEntry.ship.isSunk()) {
                        attackResult.sunk = true;
                    }
                    break;
                }
            }
            if (attackResult.hit) break;
        }
    
        if (!attackResult.hit) {
            this.missedAttacks.push({ x, y });
            attackResult.miss = true;
        }
    
        return attackResult;
    }
    


    areAllShipsSunk(){

        for(const shipEntry of this.ships){
            if(!shipEntry.ship.isSunk()){
                return false;
            }
        }

        return true;
    }
}   

module.exports=GameBoard;