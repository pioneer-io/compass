const express = require('express');
const router = express.Router();
const flagsController = require('../controllers/flagsController');
const eventLogController = require('../controllers/eventLogController');
const sdkKeysController = require('../controllers/sdkKeysController');

router.get('/flags', flagsController.getFlags, flagsController.sendFlag);

router.get(
	'/flags/:id',
	flagsController.getFlag,
	eventLogController.getEventsForFlag,
	flagsController.sendFlagWithEvents
);

router.put('/flags/:id', flagsController.updateFlag, eventLogController.addUpdateFlagEvent, flagsController.sendFlag);

router.post('/flags', flagsController.createFlag, eventLogController.addCreateFlagEvent, flagsController.sendFlag);

router.delete('/flags/:id', flagsController.deleteFlag);

router.get('/logs', eventLogController.getEventLog);

router.post('/logs', eventLogController.addDeleteFlagEvent);

router.get('/account', sdkKeysController.getSdkKey)

module.exports = router;
