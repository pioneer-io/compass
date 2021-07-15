const express = require('express');
const HttpError = require('./models/httpError');
const routes = require('./routes/api');
const { publishUpdatedRules, subscribeToRuleSetRequests } = require('./lib/nats/nats-pub');
const {fetchUsersSdkKey} = require('./lib/db/sdkKeys');
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
	await fetchUsersSdkKey();
	await publishUpdatedRules();
	await subscribeToRuleSetRequests();
});
