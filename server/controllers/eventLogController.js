const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const { createEventDb } = require('../lib/postgres-events');
const { postgresQuery } = require("../lib/postgres-query");

const getEventLog = async (req, res, next) => {
	const text = "SELECT * FROM logs";
	const result = await postgresQuery(text);
	const logData = result.rows;
	console.log("all log data", logData);
	res.json(logData);
}

const getEventsForFlag = async (req, res, next) => {
	const text = "SELECT * FROM logs WHERE flag_id = $1";
	const id = Number(req.flag.id);

	const result = await postgresQuery(text, [id]);
	const eventLog = result.rows;
	req.eventLog = eventLog;
	next();
}

const addCreateFlagEvent = async (req, res, next) => {
	console.log('event log req', req.flag);
	const errors = validationResult(req);

	const description = `Flag created.`;
	const flagId = req.flag.id;
	const title = req.flag.title;

	if (errors.isEmpty()) {
		await createEventDb(flagId, title, description)
			.then(() => next())
			.catch((err) => next(new HttpError('Creating event log failed, please try again', 500)));
	} else {
		return next(new HttpError('The information required to create an event log was not received. Please try again.', 404));
	}
};

const addUpdateFlagEvent = async (req, res, next) => {
	console.log('event log req', req.flag);
	const errors = validationResult(req);

	const description = `Updated flag: '${req.flag.title}'`;
	const flagId = req.flag.id;
	const title = req.flag.title;

	if (errors.isEmpty()) {
		await createEventDb(flagId, title, description)
			.then(() => next())
			.catch((err) => next(new HttpError('Creating event log failed, please try again', 500)));
	} else {
		return next(new HttpError('The information required to create an event log was not received. Please try again.', 404));
	}
};

const addDeleteFlagEvent = async (req, res, next) => {
	const errors = validationResult(req);
	const flagId = req.flag.id;
	const title = req.flag.title;
	const description = `Deleted flag '${title}' with id: '${flagId}'`;

	if (errors.isEmpty()) {
		await createEventDb(flagId, title, description)
			.then(() => next())
			.catch((err) => next(new HttpError('Creating event log failed, please try again', 500)));
	} else {
		return next(new HttpError('The information required to create an event log was not received. Please try again.', 404));
	}
};

exports.addCreateFlagEvent = addCreateFlagEvent;
exports.getEventLog = getEventLog;
exports.addUpdateFlagEvent = addUpdateFlagEvent;
exports.addDeleteFlagEvent = addDeleteFlagEvent;
exports.getEventsForFlag = getEventsForFlag;