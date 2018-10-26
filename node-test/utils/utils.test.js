const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);
            
            expect(res).toBe(44).toBeA('number');
        
            /*
            *   w/o expect
            */
            // if (res !== 44) {
            //     throw new Error(`Expected 44, but got ${res}`);
            // }
        });
        /*
         * When testing async function, you have to use 'done' as the parameter of the function
         *
         */
        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).toBe(7).toBeA('number');
                done();
            })
        });
    })

    describe('#square', () => {
        it('should square a number', () => {
            var res = utils.square(9);
        
            expect(res).toBe(81).toBeA('number');
        
            // if (res !== 81) {
            //     throw new Error(`Expected 81, but got ${res}`);
            // }
        });
        
        it('should async square a number', (done) => {
            utils.asyncSquare(9, (sum) => {
                expect(sum).toBe(81).toBeA('number');
                done();
            });
        });
    });    
});

it('should verifies first and last names are set', () => {
    user = {
        age: 23,
        location: 'Canada'
    };

    user = utils.setName(user, 'Michael Lizotte-Gagnon');

    expect(user).toInclude({
        firstName: 'Michael',
        lastName: 'Lizotte-Gagnon'
    }).toEqual(user);
});

// it('should expect some values', () => {
//     // expect(12).toNotBe(12);
//     // expect({name:'Andrew'}).toEqual({name:'Andrew'});
//     // expect(['banana', 'peach', 'apple']).toExclude('banana');
//     expect({
//         name: 'Andrew',
//         age: 23,
//         location: 'Canada'
//     }).toInclude({
//         age: 24
//     })
// })