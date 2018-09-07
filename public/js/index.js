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

