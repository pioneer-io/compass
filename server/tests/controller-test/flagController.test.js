// Test flag controller methods
const clearTable = require('../helper/clearTable');
const {
	getFlags,
	getFlag,
	createFlag,
	sendFlag,
	sendFlagWithEvents,
	updateFlag,
	deleteFlag
} = require('../../controllers/flagsController');
const { createFlagDb, fetchAllFlags } = require('../../lib/db/flags');
const { publishUpdatedRules } = require('../../lib/nats/nats-pub');

describe('Test Flag Controller Methods', () => {
	// no-op function for mocks
	const noop = () => {
		// do nothing
	};

	// override publishing function to prevent nats complications with test
	global.publishUpdatedRules = () => {
		console.log('publish called');
	};

	// populate data in the table for each test
	beforeEach(async () => {
		const flagsToInsert = [
			{ title: 'FROM_TEST', description: 'desc 1', rollout: 1 },
			{ title: 'FROM_TEST2', description: 'desc 2', rollout: 2 },
			{ title: 'FROM_TEST3', description: 'desc 3', rollout: 3 }
		];

		for (const flag of flagsToInsert) {
			await createFlagDb(flag.title, flag.description, flag.rollout);
		}
	});

	// remove data from table after each test
	afterEach(async () => {
		await clearTable([ 'Flags' ]);
	});

	xtest('getFlags should return multiple flags', async () => {
		const mockRequest = {};

		let responseObject = {};

		const mockResponse = {
			json : jest.fn().mockImplementation((result) => {
				responseObject = result;
			})
		};

		await getFlags(mockRequest, mockResponse, noop);

		expect(responseObject).toHaveProperty('flags');
		expect(responseObject.flags).toHaveLength(3);
		expect(responseObject.flags[0]).toHaveProperty('title', 'FROM_TEST');
		expect(responseObject.flags[1]).toHaveProperty('title', 'FROM_TEST2');
		expect(responseObject.flags[2]).toHaveProperty('title', 'FROM_TEST3');
	});

	xtest('getFlag should return one flag', async () => {
		// create a new flag so we can capture the id an use it for query
		const newFlag = await createFlagDb('FROM_TEST4', 'created for id', 4);

		const mockRequest = {
			params : { id: newFlag.id }
		};

		const mockResponse = {};

		await getFlag(mockRequest, mockResponse, noop);
		expect(mockRequest.flag).toHaveProperty('id');
		expect(mockRequest.flag).toHaveProperty('title', 'FROM_TEST4');
		expect(mockRequest.flag).toHaveProperty('description', 'created for id');
		expect(mockRequest.flag).toHaveProperty('is_active');
		expect(mockRequest.flag).toHaveProperty('rollout');
	});

	xtest('sendFlag should respond with a flag in json format', async () => {
		const mockRequest = {
			flag : {
				title       : 'TEST',
				description : 'testing',
				rollout     : 33,
				is_active   : false,
				version     : 1
			}
		};
		let responseObject = {};
		const mockResponse = {
			json : jest.fn().mockImplementation((result) => {
				responseObject = result;
			})
		};

		await sendFlag(mockRequest, mockResponse, noop);

		expect(responseObject.flag).toHaveProperty('title', 'TEST');
		expect(responseObject.flag).toHaveProperty('description', 'testing');
		expect(responseObject.flag).toHaveProperty('rollout', 33);
		expect(responseObject.flag).toHaveProperty('is_active', false);
		expect(responseObject.flag).toHaveProperty('version', 1);
	});

	xtest('sendFlagWithEvents should respond with a flag and eventLog in json format', async () => {
		const mockRequest = {
			flag     : {
				title       : 'TEST',
				description : 'testing',
				rollout     : 33,
				is_active   : false,
				version     : 1
			},
			eventLog : {
				1 : 'test log 1',
				2 : 'test log 2',
				3 : 'test log 3'
			}
		};
		let responseObject = {};
		const mockResponse = {
			json : jest.fn().mockImplementation((result) => {
				responseObject = result;
			})
		};

		await sendFlagWithEvents(mockRequest, mockResponse, noop);

		expect(responseObject.flag).toHaveProperty('title', 'TEST');
		expect(responseObject.flag).toHaveProperty('description', 'testing');
		expect(responseObject.flag).toHaveProperty('rollout', 33);
		expect(responseObject.flag).toHaveProperty('is_active', false);
		expect(responseObject.flag).toHaveProperty('version', 1);
		expect(responseObject.eventLog).toHaveProperty('1', 'test log 1');
	});

	// not sure how to extricate all of the calls for nats messaging
	xtest('createFlag should return one flag', async () => {
		const mockRequest = {
			body : {
				flag : {
					title       : 'FROM_TEST4',
					description : 'testing creation',
					rollout     : 4
				}
			}
		};

		const mockResponse = {};

		await createFlag(mockRequest, mockResponse, noop);
		expect(mockRequest.flag).toHaveProperty('id');
		expect(mockRequest.flag).toHaveProperty('title', 'FROM_TEST4');
		expect(mockRequest.flag).toHaveProperty('description', 'testing creation');
		expect(mockRequest.flag).toHaveProperty('is_active', false);
		expect(mockRequest.flag).toHaveProperty('rollout', 4);
	});

	test('updateFlag should return updated flag object', async () => {
		const newFlag = await createFlagDb('FROM_TEST4', 'created for id', 4);

		const mockRequest = {
			params       : { id: newFlag.id },
			body         : {
				flag : {
					title       : 'FROM_TEST4',
					description : 'updated flag',
					rollout     : 5,
					is_active   : true
				}
			},
			toggleChange : true
		};

		const mockResponse = {};

		await updateFlag(mockRequest, mockResponse, noop);
		expect(mockRequest.flag).toHaveProperty('id', mockRequest.params.id);
		expect(mockRequest.flag).toHaveProperty('title', 'FROM_TEST4');
		expect(mockRequest.flag).toHaveProperty('description', 'updated flag');
		expect(mockRequest.flag).toHaveProperty('is_active', true);
		expect(mockRequest.flag).toHaveProperty('rollout', 5);
	});

	test('deleteFlag should return deleted flags id', async () => {
		const newFlag = await createFlagDb('FROM_TEST4', 'created for id', 4);

		const mockRequest = {
			params : { id: newFlag.id }
		};

		let responseObject = {};
		const mockResponse = {
			json : jest.fn().mockImplementation((result) => {
				responseObject = result;
			})
		};

		await updateFlag(mockRequest, mockResponse, noop);
		expect(mockRequest.flag).toHaveProperty('id', mockRequest.params.id);
		expect(mockRequest.flag).toHaveProperty('title', 'FROM_TEST4');
		expect(mockRequest.flag).toHaveProperty('description', 'updated flag');
		expect(mockRequest.flag).toHaveProperty('is_active', true);
		expect(mockRequest.flag).toHaveProperty('rollout', 5);
	});
});
