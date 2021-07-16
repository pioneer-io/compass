// Test eventLog controller methods
const clearTable = require('../helper/clearTable');
const {
	addCreateEventFlag,
	getEventLog,
	addUpdateFlagEvent,
	addDeleteFlagEvent,
	getEventsForFlag
} = require('../../controllers/eventLogController');
const { createEventDb } = require('../../lib/db/events');

describe('Test Flag Controller Methods', () => {
	// no-op function for mocks
	const noop = () => {
		// do nothing
	};

	// populate data in the table for each test
	beforeEach(async () => {
		const logsToInsert = [
			{ id: 1, title: 'TEST_LOG 1', description: 'desc 1' },
			{ id: 2, title: 'TEST_LOG 2', description: 'desc 2' },
			{ id: 3, title: 'TEST_LOG 3', description: 'desc 3' }
		];

		for (const log of logsToInsert) {
			await createEventDb(log.id, log.title, log.description);
		}
	});

	// remove data from table after each test
	afterEach(async () => {
		await clearTable([ 'Logs' ]);
	});

	test('getEventLog should return log data in json object', async () => {
		const mockRequest = {};

		let responseObject = {};

		const mockResponse = {
			json : jest.fn().mockImplementation((result) => {
				responseObject = result;
			})
		};

		await getEventLog(mockRequest, mockResponse, noop);
		console.log(responseObject);

		expect(responseObject).toHaveLength(3);
		expect(responseObject[0]).toHaveProperty('title', 'TEST_LOG 1');
		expect(responseObject[0]).toHaveProperty('flag_id', 1);
		expect(responseObject[1]).toHaveProperty('title', 'TEST_LOG 2');
		expect(responseObject[1]).toHaveProperty('flag_id', 2);
		expect(responseObject[2]).toHaveProperty('title', 'TEST_LOG 3');
		expect(responseObject[2]).toHaveProperty('flag_id', 3);
	});
});
