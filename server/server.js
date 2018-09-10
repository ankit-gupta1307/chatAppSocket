const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const express = require('express');
const port = process.env.PORT || 3100;
var app = express();
var server = http.createServer(app);
const {Users} = require('./utils/users');
var io = socketIO(server);
var os = require("os")
app.use(express.static(publicPath));

var {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

// app.get('/', (req, res) => {
// 	res.send('Up and running');
// })
var users = new Users();
io.on('connection', (socket) => {
	

	socket.on('createMessage', (data, callback) => {
		console.log('show Data', data)
		var user = users.getUser(socket.id);
		if(user && isRealString(data.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name,  data.text));
		}

		callback();
		
	})

	socket.on('disconnect', function(data) {
		var user = users.removeUser(socket.id);
		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage(user.name, `${user.name} has left.`));
		}
	})

	socket.on('generateLocationMessage', (pos) => {
		var user = users.getUser(socket.id);
		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, pos.lat, pos.lng));
		}
	})

	socket.on('join', (params, callback) => {
		var userList = users.getUserList(params.room);
		console.log(userList);

		if(!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required');
			return;
		}
		var userNameExist = false;
		userList.forEach((user) => {
			if(((params.name).toLowerCase() == user.toLowerCase()) && !userNameExist) {
				userNameExist = true;
			}
		})
		if(userNameExist) {
			callback('user name already exist, please choose different user name');
			return;
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome ' + params.name))

		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', params.name + ' has joined.'))
		//socket.leave(params.room)
		callback();
	})

})

server.listen(port, () => {
	console.log('Server running at 3100');
})