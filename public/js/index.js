var socket = io();
socket.emit('createMessage', {
	from: 'Ankit',
	text: 'hello'
}, function() {
	console.log('got it');
})

socket.on('newMessage', function(data) {
	console.log('show Data', data)
	var li = $('<li></li>');
	li.text(`${data.from}: ${data.text}`);
	$('#messages').append(li);
})

socket.on('disconnect', function(data) {
	console.log('disconnected')
})

socket.on('joininMessage', function(data) {
	console.log('data')
})

$("#message-form").on('submit', function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'Ankit',
		text: $('[name=message]').val()
	}, function() {
		console.log('got it');
	})
})

// socket.broadcast.on('newUser', function(data) {
// 	console.log('data')
// })



