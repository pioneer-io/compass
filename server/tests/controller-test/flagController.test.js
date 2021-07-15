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
		// some code here
		let mockReq = {};
		let mockRes = {};
		await fetchAllFlags(mockReq, mockRes, noop);
		console.log(mockRes);
		expect(mockRes).toBeDefined();
	});
});
