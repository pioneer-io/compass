const { query } = require('../../lib/db/query');

const clearTable = async (tableNames) => {
	for (const tableName of tableNames) {
		const DELETE_STRING = `DELETE FROM ${tableName};`;
		await query(DELETE_STRING);
	}
};

module.exports = clearTable;
