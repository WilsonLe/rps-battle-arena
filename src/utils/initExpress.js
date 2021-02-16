const path = require('path');
require('dotenv').config();

const initExpress = (app, http) => {
	// app
	app.set('trust proxy', 1); // allow limiter to work on heroku
	app.use(require('express').json());
	app.use(require('express').static('client/build'));

	process.env.NODE_ENV === 'production' &&
		app.use(require('../controllers/toHTTPS')());

	// serve
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
		);
	});

	// listen
	const port = process.env.PORT || 5000;
	http.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

module.exports = initExpress;
