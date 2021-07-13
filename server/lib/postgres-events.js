const { postgresQuery } = require("./postgres-query");

async function createEventDb(flagId, title, description) {
	const insertText = 'INSERT INTO Logs (flag_id, title, description) VALUES($1, $2, $3) RETURNING *';
	const vals = [ flagId, title, description ];
	let lastEntry;

	const result = await postgresQuery(insertText, vals)
	lastEntry = result.rows[result.rows.length-1];
	return lastEntry;
}

exports.createEventDb = createEventDb;
