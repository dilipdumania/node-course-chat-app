const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMsg} = require('./utils/msg');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMsg', generateMsg('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMsg', generateMsg('Admin', 'New user joined'));


    socket.on('createMsg', (newMsg, callback) => {
        console.log('Create msg: ', newMsg);
        io.emit('newMsg', generateMsg(newMsg.from, newMsg.text));
        callback('This is from the server');
        
        // socket.broadcast.emit('newMsg', {
        //     from: newMsg.from,
        //     text: newMsg.text,
        //    createdAt: new Date().getTime() 
        // });
    });


    socket.on('disconnect', () => {
        console.log('Client got disconnected');
    });
});




var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
