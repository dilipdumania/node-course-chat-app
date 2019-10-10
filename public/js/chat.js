//import { listenerCount } from "cluster";

var socket = io();
socket.on('connect', function () {
    console.log('connected to chat server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

function scrollToBottom () {

    //selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('newMsg', function (msg) {
    var formattedTime = moment(msg.createdAt).format('HH:mm:ss');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
                    text: msg.text,
                    from: msg.from,
                    createdAt: formattedTime
                });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMsg', function (msg) {
    var formattedTime = moment(msg.createdAt).format('HH:mm:ss');
    
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
                    url: msg.url,
                    from: msg.from,
                    createdAt: formattedTime
                });

    jQuery('#messages').append(html);
    scrollToBottom();

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
