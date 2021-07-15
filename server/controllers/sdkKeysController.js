const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
//const { publishUpdatedRules } = require('../lib/nats/nats-pub');
const {generateNewSdkKey, fetchUsersSdkKey} = require('../lib/db/sdkKeys');

const getSdkKey = async (req, res, next) => {
    await fetchUsersSdkKey().then(key => {
        const sdkKey = key
        res.json({sdkKey});
    }).catch(err => {
		console.error(err);
		next(new HttpError('Database problem. Could not retrieve SDK key.Contact an admin', 500));
	});
}

/*
const generateSdkKey = async (req, res, next) => {
    await generateNewSdkKey().then(key => {
        res.sdkKey = key;
    }).catch(err => {
		console.error(err);
		next(new HttpError('Database problem. Could not create new SDK key.Contact an admin', 500));
	});
}
*/

exports.getSdkKey = getSdkKey;
// exports.generateSdkKey = generateSdkKey;