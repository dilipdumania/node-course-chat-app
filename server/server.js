const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMsg', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });

    socket.broadcast.emit('newMsg', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()

    })



    socket.on('disconnect', () => {
        console.log('Client got disconnected');
    });

    // socket.emit('newMsg', {
    //     from: 'john',
    //     text: 'Hey, what is going on',
    //     createdAt: new Date()
    // });

    socket.on('createMsg', (newMsg) => {
        console.log('Create msg: ', newMsg);
        // io.emit('newMsg', {
        //     from: newMsg.from,
        //     text: newMsg.text,
        //     createdAt: new Date().getTime()
        // })
        socket.broadcast.emit('newMsg', {
            from: newMsg.from,
            text: newMsg.text,
           createdAt: new Date().getTime() 
        })
    })

});




var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
