const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');
const jsw = require('../lib/nats/jsw');
const { createFlagDb, fetchAllFlags, fetchFlag, updateFlagDb, deleteFlagDb } = require('../lib/db/flags');

const getFlags = async (req, res, next) => {
	await fetchAllFlags().then(flags => {
		res.json({
			flags
		});
	}).catch(err => {
		console.error(err);
		next(new HttpError('Database problem. Could not retrieve flags.Contact an admin', 500));
	});
};

const getFlag = async (req, res, next) => {
	const id = req.params.id.toString();
	await fetchFlag(id)
		.then((flag) => {
			req.flag = flag;
			next();
		})
		.catch(err => {
			console.error(err);
			next(new HttpError(`Flag id ${id} not found in database.`, 404));
		});
};

const createFlag = async (req, res, next) => {
	const errors = validationResult(req);
	const { title, description, rollout } = req.body.flag;

	if (errors.isEmpty() && rollout !== '') {
		await createFlagDb(title, description, rollout)
			.then((flag) => {
				req.flag = flag;
				jsw.publishUpdatedRules().catch(err => console.error("There was an error publishing the updated ruleset to NATS."));
				next();
			})
			.catch((err) => {
				console.log(err);
				next(new HttpError('Creating flag failed. Contact server admin.', 500));
			});
	} else {
		next(new HttpError('Could not create flag. Missing input.', 500));
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
	const toggleChange = req.body.toggleChange;
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		await updateFlagDb(id, flag.title, flag.description, flag.is_active, flag.rollout)
			.then((flag) => {
				req.flag = flag;
				req.toggleChange = toggleChange;

				jsw.publishUpdatedRules().catch(err => console.error("There was an error publishing the updated ruleset to NATS"));
				next();
			})
			.catch(err => {
				console.error(err);
				next(new HttpError('Updating flag failed, contact admin.', 500))
			});
	} else {
		console.error(errors);
		return next(new HttpError('Could not update flag. Missing required input.', 500));
	}
};

const deleteFlag = async (req, res, next) => {
	const id = req.params.id.toString();

	await deleteFlagDb(id)
		.then((deleteSuccess) => {
			if (deleteSuccess) {
				jsw.publishUpdatedRules().catch(err => console.error("There was an error publishing the updated ruleset to NATS"));

				res.send({ id });
			} else {
				next(new HttpError(`Deleting flag failed, flag ${id} not found.`, 500));
			}
		})
		.catch(err => {
			console.error(err);
			next(new HttpError('Deleting flag failed, contact your admin.', 500))
		});
};

module.exports.getFlags = getFlags;
module.exports.getFlag = getFlag;
module.exports.createFlag = createFlag;
module.exports.updateFlag = updateFlag;
module.exports.sendFlag = sendFlag;
module.exports.sendFlagWithEvents = sendFlagWithEvents;
module.exports.deleteFlag = deleteFlag;
