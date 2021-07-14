const { Client } = require('pg');
const HttpError = require('../../models/httpError');

const CLIENT_CONFIG = {
	user     : 'postgres',
	host     : 'localhost',
	port     : 5432,
	database : 'postgres',
	password : 'secret'
};

const logQuery = (statement, parameters) => {
	const timeStamp = new Date();
	const formattedTimeStamp = timeStamp.toString().substring(4, 24);

	console.log(formattedTimeStamp, statement, parameters || '');
};

const query = async (statement, parameters) => {
	const client = new Client(CLIENT_CONFIG);

	await client.connect();
	logQuery(statement, parameters);

	const result = await client.query(statement, parameters).catch((err) => {
		console.error('an error has occurred when querying the database', err);
		throw new HttpError('An error occurred when querying the database', 500);
	});
	await client.end();

	return result;
};

module.exports = {
	query
};
