const HttpError = require("../../models/httpError");
const { query } = require("./query");

async function createEventDb(flagId, title, description) {
	const queryText = 'INSERT INTO Logs (flag_id, title, description) VALUES($1, $2, $3) RETURNING *';
	const vals = [ flagId, title, description ];

	const result = await query(queryText, vals).catch(err => {
		console.error(err);
		throw new HttpError('An error occurred when querying the database', 500);
	});

	const lastEntry = result.rows[result.rows.length-1];
	return lastEntry;
}

exports.createEventDb = createEventDb;
