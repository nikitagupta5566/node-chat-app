const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message')

var publicPath = path.join(__dirname, '../public');
console.log(publicPath);   // returns the final path

// console.log(__dirname + '../public');    // F:\NodeProjects\node-chat-app\server../public (returns path like this)

var app = express();
var server = http.createServer(app);
var io = socketIO(server);		// Pass the server that we want to use with socketio

// io is a web socket server.
app.use(express.static(publicPath));


// io.on lets u register event listener. We can listen for a specific event and do sthg when that event happens.
// connection is an event that lets u listen for a new connection an let u do sthg when that connection is established.

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('admin', 'New User joined'));

	socket.on('disconnect', () => {
		console.log("Disconnected from the client");
	})

	socket.on('createEmail', function(email) {
		console.log(email);
	})

	socket.on('createMessage', (message, callback) => {
		console.log(message);
		callback('This is from the server');
		// io.emit emits event to every single connection
		io.emit('newMessage', generateMessage(message.from,message.text));

		// socket.broadcast.emit('newMessage', {      // send the event to everybody except this socket
		// 	from: message.from,
		// 	text: message.text
		})
	

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	})

// 	socket.emit('newEmail', {
// 		from: "nikitagupta",
// 		text: "Hi how r u",
// 		createAt: Date()
	// }); 

// second argument is the data that we want to pass....since we want to send multiple data we are going to pass an object

// 	socket.emit('newMessage', {
// 		from: 'Nikita',
// 		text: 'Yeah, Sure',
})

server.listen(3000, () => {
	console.log("Server is up on port 3000");
})