const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const { createEventDb } = require('../lib/db/events');
const { postgresQuery } = require("../lib/db/query");

const getEventLog = async (req, res, next) => {
	const text = "SELECT * FROM logs";
	const result = await postgresQuery(text);
	const logData = result.rows;
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
	const errors = validationResult(req);
	const toggleChange = req.toggleChange;
	const flag = req.flag;
	const toggleStatus = req.flag.is_active ? 'on' : 'off';
	const flagId = flag.id;
	const title = flag.title;

	const description = toggleChange ? `Flag ${title} toggled ${toggleStatus}` : `Updated flag: '${title}'`;

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
	const deletedFlag = req.body;

	const description = `Deleted flag '${deletedFlag.title}' with id: '${deletedFlag.id}'`;

	if (errors.isEmpty()) {
		await createEventDb(deletedFlag.id, deletedFlag.title, description)
			.then((data) => res.json({data}))
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