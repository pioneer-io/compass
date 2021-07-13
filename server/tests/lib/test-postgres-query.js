const { Client } = require("pg");

const CLIENT_CONFIG = {
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "test",
  password: "secret",
}

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

const testQuery = async(statement, parameters) => {
  let client = new Client(CLIENT_CONFIG);

  await client.connect();
  logQuery(statement, parameters);
  let result = await client.query(statement, parameters).catch(err => {
    console.log("an error has occurred when querying", err);
  });
  await client.end();

  return result;
}



const clearDb = async() => {
  const DELTE_QUERY = "DELETE * FROM Flags, Logs, Strategies";

  testQuery(DELETE_QUERY);
}

module.exports = {
  testQuery
};