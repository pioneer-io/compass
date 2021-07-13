const { postgresQuery } = require('../../lib/postgres-query');

const clearTable = async(tableNames) => {
  for (const tableName of tableNames) {
    const DELETE_STRING = `DELETE FROM ${tableName};`;
    await postgresQuery(DELETE_STRING);
  }
};

module.exports = clearTable;