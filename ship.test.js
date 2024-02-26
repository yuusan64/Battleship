const Ship = require('./ship');

describe('Ship functionality', ()=>{
    test('Ship correctly initialized', ()=>{
        const ship=new Ship(3);
        expect(ship.length).toBe(3);
        expect(ship.timesHit).toBe(0);
        expect(ship.isSunk()).toBe(false);
    });

    test('Ship hit increases timesHit', ()=>{
        const ship = new Ship(3);
        ship.hit();
        expect(ship.timesHit).toBe(1);
    });

    test('Ship sinks after enough hits', ()=>{
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});