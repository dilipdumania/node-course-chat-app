//import { listenerCount } from "cluster";

var socket = io();
socket.on('connect', function () {
    console.log('connected to chat server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    var formattedTime = moment(msg.createdAt).format('HH:mm:ss');
    
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${msg.from}: ${msg.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMsg', function (msg) {
    var formattedTime = moment(msg.createdAt).format('HH:mm:ss');
    
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${msg.from}: `);

    var a = jQuery('<a target="_blank">My Current Location</a>');
    a.attr('href', msg.url);

    li.append(a);
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

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMsg', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        console.log("Geolocation service not available");
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        console.log('Unable to fetch geolocation');
    })
})
