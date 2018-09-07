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



// app.get('/', (req, res) => {
// 	res.send('Up and running');
// })

io.on('connection', (socket) => {
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome Ankit',
		createdAt: new Date().getTime()
	})

	socket.broadcast.emit('newMessage', {
		text: 'Ankit joined the group',
		from: 'Admin',
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', function(data) {
		console.log('show Data', data)
		// io.emit('newMessage', {
		// 	from : data.from,
		// 	text: data.text,
		// 	createdAt: new Date().getTime()
		// })
		socket.broadcast.emit('newMessage', {
			from : data.from,
			text: data.text,
			createdAt: new Date().getTime()
		})
	})

	socket.on('disconnect', function(data) {
		console.log('disconnected')
	})


})

server.listen(port, () => {
	console.log('Server running at 3100');
})