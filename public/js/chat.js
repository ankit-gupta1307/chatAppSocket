var socket = io();
socket.on('connect', function() {
	var params = $.deparam(window.location.search);
	socket.emit('join', params, function(err) {
		if(err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('no error');
		}
	})
})

function scrollToBottom() {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = messages.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

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
	scrollToBottom();
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
	scrollToBottom();
})

socket.on('disconnect', function(data) {
	console.log('disconnected')
	

})

socket.on('updateUserList', function(users) {
	console.log(users);
	var ol = $('<ol></ol>')
	users.forEach(function(user) {
		ol.append($('<li></li>').text(user));
	})

	$('#users').html(ol)
})



socket.on('joininMessage', function(data) {
	console.log('data')
})

$("#message-form").on('submit', function(e) {
	e.preventDefault();
	var messageTextBox = $('[name=message]');
	socket.emit('createMessage', {
		from: $.deparam(window.location.search).name,
		text: messageTextBox.val(),
		room: $.deparam(window.location.search).room
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
	 	socket.emit('generateLocationMessage', {
	 		lat: pos.coords.latitude,
	 		lng: pos.coords.longitude,
	 		room: $.deparam(window.location.search).room
	 	})
	}, function(err) {
		$('#sendLocation').removeAttr('disabled');
		alert('Unable to fetch location');
	})
})

// socket.broadcast.on('newUser', function(data) {
// 	console.log('data')
// })



