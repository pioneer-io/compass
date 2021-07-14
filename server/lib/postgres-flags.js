const HttpError = require('../models/httpError');
const { postgresQuery } = require('./postgres-query');

async function createFlagWithCustomDescription(title, description) {
	const queryText = 'INSERT INTO Flags(title, description) VALUES($1, $2) RETURNING *';
	const vals = [ title, description];
	const result = await postgresQuery(queryText, vals);
	return result;
}

async function createFlagWithDefaultDescription(title) {
	const queryText = 'INSERT INTO Flags(title) VALUES($1) RETURNING *';
	const vals = [ title ];
	const result = await postgresQuery(queryText, vals);
	return result;
}

async function createFlagDb(title, description) {
	let result;

	if (description.trim().length < 1) {
		result = await createFlagWithDefaultDescription(title);
	} else {
		result = await createFlagWithCustomDescription(title, description);
	}

	return result.rows[result.rows.length-1]
}

async function fetchAllFlags() {
	const queryText = 'SELECT * FROM flags';
	const result = await postgresQuery(queryText);
	return result.rows;
}

async function fetchFlag(id) {
	const queryText = 'SELECT * FROM flags WHERE id = $1';
	const vals = [ id ];
	const result = await postgresQuery(queryText, vals);

	if (result.rows.length < 1) {
		throw new HttpError(`No flag with id ${id}.`, 404);
	}

	return result.rows[0];
}

async function updateFlagDb(id, title, description, isActive) {
	const queryText =
		'UPDATE Flags SET (title, description, is_active) = ($2, $3, $4) WHERE id = $1';

	const vals = [ id, title, description, isActive ];
	const result = await postgresQuery(queryText, vals);

	const updateSuccess = result.rowCount === 1;

	if (updateSuccess) {
		const flagData = await fetchFlag(id);
		return flagData;
	} else {
		throw new Error('Error updating flag');
	}
}

async function deleteFlagDb(id) {
	const queryText = 'DELETE from Flags WHERE id = $1';
	const vals = [ id ];
	const result = await postgresQuery(queryText, vals);
	return result.rowCount === 1; // bool indicating success or not
}

exports.createFlagDb = createFlagDb;
exports.fetchAllFlags = fetchAllFlags;
exports.fetchFlag = fetchFlag;
exports.updateFlagDb = updateFlagDb;
exports.deleteFlagDb = deleteFlagDb;
