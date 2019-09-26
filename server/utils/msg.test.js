const expect = require('expect');
const {generateMsg} = require('./msg');


describe('generateMsg', () => {

    it('should generate correct message obj', () => {

        var from = 'dilip';
        var text = 'Hello there';

        var msg = generateMsg(from, text);
        expect(msg).toInclude({from, text});
        expect(msg.createdAt).toExist();
        expect(msg.createdAt).toBeA('number');
    });
});