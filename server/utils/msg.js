var generateMsg = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMsg = (from, latitude, longitude) => {
    var url = `https://google.com/maps?q=${latitude},${longitude}`;
    return {
        from,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMsg, generateLocationMsg};