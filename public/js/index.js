var socket = io(); 
// it is a method available to us because we loaded this library. It's not native to the browser. 
//And when we call it we're actually initiating the request from the client to the server to open up a
// web socket and keep that connection alive.

socket.on('connect' ,function () {
	console.log("Connected to the server");

	socket.emit('createEmail', {
		to: "mike@ngkfng.com",
		text: "hi i am fine",
	})

	// socket.emit('createMessage', {
	// 	to: 'nikita',
	// 	text: 'Can i call u up',
	// })

})

socket.on('disconnect', function () {
	console.log("Disconnected from server");
})

socket.on('newEmail', function(email) {             // the data that is emmitted with your event is passed as the first argument to your function
	console.log('New Email',email);
})


socket.on('newMessage', function(message) {
	console.log('Hey! you have a new message',message);
})
