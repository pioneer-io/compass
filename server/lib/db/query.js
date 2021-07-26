const { Client } = require('pg');
const HttpError = require('../../models/httpError');

let clientConfig

const createClientConfig = () => {
	clientConfig = {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		port: process.env.POSTGRES_PORT,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB
	}
}


const logQuery = (statement, parameters) => {
	const timeStamp = new Date();
	const formattedTimeStamp = timeStamp.toString().substring(4, 24);

	console.log(formattedTimeStamp, statement, parameters || '');
};

const query = async (statement, parameters) => {
	if (!clientConfig) {
		createClientConfig();
	}

	const client = new Client(clientConfig);

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
