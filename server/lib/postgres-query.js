const { Client } = require("pg");

const CLIENT_CONFIG = {
  user: "postgres",
  host: "localhost",
  port: process.env.PORT,
  database: "postgres",
  password: "secret",
}

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

const postgresQuery = async(statement, parameters) => {
  let client = new Client(CLIENT_CONFIG);

  await client.connect();
  logQuery(statement, parameters);
  let result = await client.query(statement, parameters).catch(err => {
    console.log("an error has occurred when querying", err);
  });
  await client.end();

  return result;
}

module.exports = {
  postgresQuery
};