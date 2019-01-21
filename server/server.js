const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname, '../public');
console.log(publicPath);   // returns the final path

// console.log(__dirname + '../public');    // F:\NodeProjects\node-chat-app\server../public (returns path like this)

var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
	console.log("Server is up on port 3000");
})