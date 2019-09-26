var socket = io();
socket.on('connect', function () {
    console.log('connected to chat server');

    // socket.emit('createMsg', {
    //     from: 'Dilip',
    //     text: 'hey there'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    console.log('New Msg received: ', msg);
});




