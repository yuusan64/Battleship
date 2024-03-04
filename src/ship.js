class Ship{

    constructor(length){
        this.length=length;
        this.timesHit=0;
        this.sunk=false;
        this.hitPositions = new Set();
    }

    hit(position){
        this.timesHit=this.timesHit+1;
        this.hitPositions.add(JSON.stringify(position));
    }

    isHit(position){
        return this.hitPositions.has(JSON.stringify(position));
    }
    
    isSunk(){
        return this.timesHit >= this.length;
    }

}

module.exports=Ship;