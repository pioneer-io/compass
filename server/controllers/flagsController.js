const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const { publish } = require('../lib/nats-pub');
const { createFlagDb, fetchAllFlags, fetchFlag, updateFlagDb, deleteFlagDb } = require('../lib/postgres-flags');

const getFlags = async (req, res, next) => {
	await fetchAllFlags().then((flags) => {
		res.json({
			flags
		});
	});
};

const getFlag = async (req, res, next) => {
	const id = req.params.id.toString();
	await fetchFlag(id)
		.then((flag) => {
			req.flag = flag;
			next();
		})
		.catch((err) => {
			console.log(err);
			next(new HttpError('Flag id not found, please try again.', 404));
		});
};

const createFlag = async (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		const { title, description } = req.body.flag;
		await createFlagDb(title, description)
			.then((flag) => {
				req.flag = flag;
				publish('FLAG.created', `New flag created. Data: ${JSON.stringify(flag)}`);
				next();
			})
			.catch((err) => {
				console.log(err);
				next(new HttpError('Creating flag failed, please try again'));
			});
	} else {
		return next(new HttpError('missing input.', 404));
	}
};

const sendFlag = (req, res, next) => {
	const flag = req.flag;
	res.json({ flag });
};

const sendFlagWithEvents = (req, res, next) => {
	const flag = req.flag;
	const eventLog = req.eventLog;
	res.json({ flag, eventLog });
};

const updateFlag = async (req, res, next) => {
	const id = req.params.id.toString();
	const flag = req.body.flag;
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		await updateFlagDb(id, flag.title, flag.description, flag.is_active)
			.then((flag) => {
				req.flag = flag;
				publish('FLAG.updated', `Flag updated. Data: ${JSON.stringify(flag)}`);
				next();
			})
			.catch((err) => next(new HttpError('Updating flag failed, please try again', 500)));
	} else {
		console.log(errors);
		return next(new HttpError('The input field is empty.', 404));
	}
};

const deleteFlag = async (flag, req, res, next) => {
	console.log(" I AM IN DELETEFLAG in flagsController")
	const id = req.params.id.toString();
	console.log("FLAG: ", flag);

	await deleteFlagDb(id)
		.then((deleteSuccess) => {
			if (deleteSuccess) {
				publish('FLAG.deleted', `${id}`);

				res.send({ id });
				// next(id);
			} else {
				next(new HttpError('Deleting flag failed, not found.', 400));
			}
		})
		.catch((err) => next(new HttpError('Deleting flag failed, try again.', 500)));
};

module.exports.getFlags = getFlags;
module.exports.getFlag = getFlag;
module.exports.createFlag = createFlag;
module.exports.updateFlag = updateFlag;
module.exports.sendFlag = sendFlag;
module.exports.sendFlagWithEvents = sendFlagWithEvents;
module.exports.deleteFlag = deleteFlag;
