var socket = io();
// socket.emit('createMessage', {
// 	from: 'User',
// 	text: 'hello'
// }, function() {
// 	console.log('got it');
// })

socket.on('newMessage', function(data) {
	var formattedTime = moment(data.createdAt).format('h:mm a');
	// console.log('show Data', data)
	// var li = $('<li></li>');
	// li.text(`${data.from} ${formattedTime}: ${data.text}`);
	// $('#messages').append(li);

	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		createdAt: formattedTime,
		text: data.text,
		from: data.from
	});
	$('#messages').append(html);
})

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		createdAt: formattedTime,
		url: message.url,
		from: message.from
	});
	$('#messages').append(html);
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



