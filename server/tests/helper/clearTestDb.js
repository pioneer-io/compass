const { postgresQuery } = require('../../lib/postgres-query');

const clearTestDb = async() => {
  const DELETE_STRING = "DELETE FROM Flags";
  await postgresQuery(DELETE_STRING);
};

module.exports = clearTestDb;