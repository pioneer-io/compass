const express = require('express');
const HttpError = require('./models/httpError');
const routes = require('./routes/api');
const rateLimit = require("express-rate-limit");
const jsw = require('./lib/nats/jsw');
const {fetchUsersSdkKey} = require('./lib/db/sdkKeys');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200 // limit each IP to 200 requests per windowMs
});

app.use(limiter);
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.json());

app.use('/', routes);

app.use((req, res, next) => {
	const error = new HttpError(`Could not find this route: ${req}.`, 404);
	throw error;
});

app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}
	res.status(err.code || 500);
	res.json({ error: err.message || 'An unknown error occured' });
});

app.listen(PORT, async () => {
	console.log(`Server listening on ${PORT}`);
	await jsw.init().catch(err => console.error("NATS connection failed", err));
});
