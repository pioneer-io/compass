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

describe('Test Flag Controller Methods', () => {
	// no-op function for mocks
	const noop = () => {
		// do nothing
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

	test('getFlags should return multiple flags', async () => {
		const mockRequest = {};

		let responseObject = {};

		const mockResponse = {
			json : jest.fn().mockImplementation((result) => {
				responseObject = result;
			})
		};
		// some code here
		await getFlags(mockRequest, mockResponse, noop);
		console.log(responseObject);
		expect(responseObject).toHaveProperty('flags');
		expect(responseObject.flags).toHaveLength(3);
		expect(responseObject.flags[0]).toHaveProperty('title', 'FROM_TEST');
	});
});
