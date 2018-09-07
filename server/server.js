const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const socketIO = require('socket.io');
const express = require('express');
const port = process.env.PORT || 3100;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
var {generateMessage} = require('./utils/message');


// app.get('/', (req, res) => {
// 	res.send('Up and running');
// })

io.on('connection', (socket) => {
	socket.emit('newMessage', generateMessage('Admin', 'Welcome Ankit'))

	socket.broadcast.emit('newMessage',generateMessage('Admin', 'Ankit joined the group'))

	socket.on('createMessage', (data, callback) => {
		console.log('show Data', data)
		io.emit('newMessage', generateMessage(data.from,  data.text));
		callback();
	})

	socket.on('disconnect', function(data) {
		console.log('disconnected')
	})


})

server.listen(port, () => {
	console.log('Server running at 3100');
})