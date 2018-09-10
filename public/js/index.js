var socket = io();
// socket.emit('createMessage', {
// 	from: 'User',
// 	text: 'hello'
// }, function() {
// 	console.log('got it');
// })

socket.on('newMessage', function(data) {
	var formattedTime = moment(data.createdAt).format('h:mm a');
	console.log('show Data', data)
	var li = $('<li></li>');
	li.text(`${data.from} ${formattedTime}: ${data.text}`);
	$('#messages').append(li);
})

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(data.createdAt).format('h:mm a');
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');
	li.text = `${message.from} ${formattedTime}:`
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
	var messageTextBox = $('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('');
	})
})

$('#sendLocation').on('click', function() {
	if(!navigator.geolocation) {
		return alert("Geolocation not supported by your browser");
	}
	$('#sendLocation').attr('disabled', 'disabled');
	navigator.geolocation.getCurrentPosition(function(pos) {
		$('#sendLocation').removeAttr('disabled');
	 	socket.emit('locationData', {
	 		lat: pos.coords.latitude,
	 		lng: pos.coords.longitude
	 	})
	}, function(err) {
		$('#sendLocation').removeAttr('disabled');
		alert('Unable to fetch location');
	})
})

// socket.broadcast.on('newUser', function(data) {
// 	console.log('data')
// })



