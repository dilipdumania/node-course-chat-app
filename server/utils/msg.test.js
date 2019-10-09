const expect = require('expect');
const {generateMsg, generateLocationMsg} = require('./msg');


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


describe('newLocationMsg', () => {

    it('should generate correct location message obj', () => {
        var from = 'dilip';
        var latitude = 15;
        var longitude = 34;
        var url = `https://google.com/maps?q=${latitude},${longitude}`;

        var msg = generateLocationMsg(from, latitude, longitude);
        expect(msg).toInclude({from, url});
        expect(msg.createdAt).toExist();
        expect(msg.createdAt).toBeA('number');
    });

});