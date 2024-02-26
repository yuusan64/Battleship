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


    receiveAttack(x,y){

        let hit=false;

        for(const shipEntry of this.ships){
            for(const position of shipEntry.positions){
                if(position.x === x && position.y===y){
                    shipEntry.ship.hit();
                    hit=true;
                    break;
                }
            }

           if(hit){
            break;
           }
 
        }

        if(!hit){
            this.missedAttacks.push({x,y});
        }

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