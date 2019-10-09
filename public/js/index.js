var socket = io();
socket.on('connect', function () {
    console.log('connected to chat server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    console.log('New Msg received: ', msg);
    
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMsg', {
//         from: 'Dilip',
//         text: 'hey there'
//     }, function(data){
//         console.log('got it: ', data);
//     });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMsg', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

