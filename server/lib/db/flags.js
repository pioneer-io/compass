const HttpError = require('../../models/httpError');
const { query } = require('./query');

async function createFlagWithCustomDescription(title, description, rollout) {
	const queryText = 'INSERT INTO Flags(title, description, rollout) VALUES($1, $2, $3) RETURNING *';
	const vals = [ title, description, rollout ];
	const result = await query(queryText, vals).catch((err) => {
		console.error(err);
		throw new HttpError(`Database error. Creation failed.`, 500);
	});
	return result;
}

async function createFlagWithDefaultDescription(title, rollout) {
	const queryText = 'INSERT INTO Flags(title, rollout) VALUES($1, $2) RETURNING *';
	const vals = [ title, rollout ];
	const result = await query(queryText, vals).catch((err) => {
		console.error(err);
		throw new HttpError(`Database error. Creation failed.`, 500);
	});
	return result;
}

async function createFlagDb(title, description, rollout) {
	let result;

	if (!description || description.trim().length < 1) {
		result = await createFlagWithDefaultDescription(title, rollout).catch((err) => {
			console.error(err);
			throw new HttpError(`Database error. Creation failed.`, 500);
		});
	} else {
		result = await createFlagWithCustomDescription(title, description, rollout).catch((err) => {
			console.error(err);
			throw new HttpError(`Database error. Creation failed.`, 500);
		});
	}

	return result.rows[result.rows.length - 1];
}

async function fetchAllFlags() {
	const queryText = 'SELECT * FROM flags';
	const result = await query(queryText);
	return result.rows;
}

async function fetchFlag(id) {
	const queryText = 'SELECT * FROM flags WHERE id = $1';
	const vals = [ id ];
	const result = await query(queryText, vals).catch((err) => {
		console.error(err);
		throw new HttpError(`Database error. Retrieval failed.`, 500);
	});

	if (result.rows.length < 1) {
		throw new HttpError(`No flag with id ${id}.`, 404);
	}

	return result.rows[0];
}

async function updateFlagDb(id, title, description, isActive, rollout) {
	const queryText = 'UPDATE Flags SET (title, description, is_active, rollout) = ($2, $3, $4, $5) WHERE id = $1';

	const vals = [ id, title, description, isActive, rollout ];
	const result = await query(queryText, vals).catch((err) => {
		console.error(err);
		throw new HttpError(`Database error. Update failed.`, 500);
	});

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
	const result = await query(queryText, vals).catch((err) => {
		console.error(err);
		throw new HttpError(`Database error. Deletion failed.`, 500);
	});
	return result.rowCount === 1; // bool indicating success or not
}

exports.createFlagWithCustomDescription = createFlagWithCustomDescription;
exports.createFlagWithDefaultDescription = createFlagWithDefaultDescription;
exports.createFlagDb = createFlagDb;
exports.fetchAllFlags = fetchAllFlags;
exports.fetchFlag = fetchFlag;
exports.updateFlagDb = updateFlagDb;
exports.deleteFlagDb = deleteFlagDb;
