const HttpError = require('../../models/httpError');
const { query } = require('./query');
const { v4: uuidv4 } = require('uuid');

async function invalidateCurrentSdkKey() {
	const currentValidKey = await fetchSdkKey();
	const queryText = "UPDATE Keys SET (sdk_key, is_valid) = ($1, false) WHERE sdk_key = $1"
	vals = [currentValidKey];
	const result = await query(queryText, vals).catch(err => {
		console.log(err);
		throw new HttpError('Database error. Failed to invalidate SDK key', 500);
	});

	const success = result.rowCount === 1
	console.log(`invalidation success: ${success}`);
}

async function generateNewSdkKey() {
	await invalidateCurrentSdkKey();

	const newKey = uuidv4();
	const queryText = "INSERT INTO Keys (sdk_key, is_valid) VALUES($1, $2)";
	const vals = [newKey, true];
	const result = await query(queryText, vals).catch(err => {
		console.log(err);
		throw new HttpError('Database error. Failed to create SDK key', 500);
	});

	return newKey;
}

async function fetchSdkKey() {
	const queryText = "SELECT sdk_key FROM Keys WHERE is_valid = $1";
	const vals = [true];
	const result = await query(queryText, vals).catch(err => {
			console.log(err);
			throw new HttpError('Database error. Failed to fetch SDK key', 500);
	});
	
	if (result.rows[0] == undefined) {
		return false;
	}
	
	return result.rows[0].sdk_key;
}

async function fetchUsersSdkKey() {
	let key = await fetchSdkKey();
	if (!key) {
		key = await generateNewSdkKey(); 
	}
	return key;
}

exports.generateNewSdkKey = generateNewSdkKey;
exports.fetchUsersSdkKey = fetchUsersSdkKey;
