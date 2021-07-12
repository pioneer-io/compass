const express = require('express');
const HttpError = require('./models/httpError');
const routes = require('./routes/api');
const { publishInit } = require('./lib/nats-pub');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.json());

app.use('/', routes);

app.use((req, res, next) => {
	const error = new HttpError('Could not find this route.', 404);
	throw error;
});

app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}
	res.status(err.code || 500);
	res.json({ error: err.message || 'An unknown error occured' });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
	publishInit();
});
