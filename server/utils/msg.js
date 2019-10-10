var moment = require('moment');

var generateMsg = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMsg = (from, latitude, longitude) => {
    var url = `https://google.com/maps?q=${latitude},${longitude}`;
    return {
        from,
        url,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMsg, generateLocationMsg};