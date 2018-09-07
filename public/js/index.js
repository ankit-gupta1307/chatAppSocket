var socket = io();
socket.emit('createMessage', {
	from: 'Ankit',
	text: 'hello'
})

socket.on('newMessage', function(data) {
	console.log('show Data', data)
})

socket.on('disconnect', function(data) {
	console.log('disconnected')
})

socket.on('joininMessage', function(data) {
	console.log('data')
})

// socket.broadcast.on('newUser', function(data) {
// 	console.log('data')
// })



