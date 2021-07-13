const { postgresQuery } = require('./postgres-query');

async function createFlagDb(title, description = '', isActive = false) {
	const insertText = 'INSERT INTO Flags(title, description, is_active) VALUES($1, $2, $3) RETURNING *';
	const vals = [ title, description, isActive ];
	const result = await postgresQuery(insertText, vals);
	const lastIndex = result.rows.length - 1;
	const lastEntry = result.rows[lastIndex];
	return lastEntry;
}

async function fetchAllFlags() {
	const insertText = 'SELECT * FROM flags';
	const result = await postgresQuery(insertText);
	const flagData = result.rows;
	console.log('all flag data', flagData);
	return flagData;
}

async function fetchFlag(id) {
	const insertText = 'SELECT * FROM flags WHERE id = $1';
	const searchVal = [ id ];
	const result = await postgresQuery(insertText, searchVal);
	const flagData = result.rows[0];
	return flagData;
}

async function updateFlagDb(id, title, description, isActive) {
	const QUERY_STRING =
		'UPDATE Flags SET (title, description, is_active) = ($2, $3, $4) WHERE id = $1';

	const params = [ id, title, description, isActive ];
	const result = await postgresQuery(QUERY_STRING, params);

	// IMPORTANT: update and delete queries result in empty rows but rowCount > 0;
	// thought this was a bug, but don't think it is
	const updateSuccess = result.rowCount === 1;
	console.log(`postgres-flag.js: flag data updated (id: ${id})`, updateSuccess);
	if (updateSuccess) {
		const flagData = await fetchFlag(id);
		return flagData;
	} else {
		throw new Error('Error updating flag');
	}
}

async function deleteFlagDb(id) {
	const QUERY_STRING = 'DELETE from Flags WHERE id = $1';
	const params = [ id ];
	const result = await postgresQuery(QUERY_STRING, params);

	// IMPORTANT: update and delete queries result in empty rows but rowCount > 0;
	// thought this was a bug, but don't think it is
	const deleteSuccess = result.rowCount === 1;
	console.log('deleteFlagDB delete success :', deleteSuccess);
	return deleteSuccess;
}

// bug report: await updating a flag, result.rows empty?

exports.createFlagDb = createFlagDb;
exports.fetchAllFlags = fetchAllFlags;
exports.fetchFlag = fetchFlag;
exports.updateFlagDb = updateFlagDb;
exports.deleteFlagDb = deleteFlagDb;
