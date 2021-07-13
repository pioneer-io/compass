const { postgresQuery } = require('../../lib/postgres-query');

const clearTestDb = async() => {
  const DELETE_STRING = "DELETE FROM Flags; DELETE FROM Strategies; DELETE FROM Logs";
  await postgresQuery(DELETE_STRING);
};

module.exports = clearTestDb;