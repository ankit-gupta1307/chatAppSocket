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

socket.on('newLocationMessage', function(message) {
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');
	li.text = `${message.from}:`
	a.attr('href', message.url);
	li.append(a);
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

$('#sendLocation').on('click', function() {
	if(!navigator.geolocation) {
		return alert("Geolocation not supported by your browser");
	}

	navigator.geolocation.getCurrentPosition(function(pos) {
	 	socket.emit('locationData', {
	 		lat: pos.coords.latitude,
	 		lng: pos.coords.longitude
	 	})
	}, function(err) {
		alert('Unable to fetch location');
	})
})

// socket.broadcast.on('newUser', function(data) {
// 	console.log('data')
// })



