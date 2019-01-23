var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date(),
	}
}

var generateLocationMessage = (from, latitude, longitude) => {
	console.log(latitude,longitude);
	return  {
		from: 'Admin',
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: new Date().getTime(),
	}
}

module.exports = {generateMessage,generateLocationMessage};