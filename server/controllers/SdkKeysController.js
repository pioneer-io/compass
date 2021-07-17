const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const { publishSdkKey } = require('../lib/nats/nats-pub');
const { generateNewSdkKey, fetchUsersSdkKey } = require('../lib/db/sdkKeys');

const getSdkKey = async (req, res, next) => {
	await fetchUsersSdkKey()
		.then((key) => {
			console.log('fetching sdk key');
			const sdkKey = key;
			publishSdkKey();
			res.json({ sdkKey });
		})
		.catch((err) => {
			console.error(err);
			next(new HttpError('Database problem. Could not retrieve SDK key.Contact an admin', 500));
		});
};

const createSdkKey = async (req, res, next) => {
	await generateNewSdkKey()
		.then((key) => {
			const sdkKey = key;
			res.json({ sdkKey });
		})
		.catch((err) => {
			console.error(err);
			next(new HttpError('Database problem. Could not create new SDK key.Contact an admin', 500));
		});
};

exports.getSdkKey = getSdkKey;
exports.createSdkKey = createSdkKey;
