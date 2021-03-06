const clearTable = require('../helper/clearTable');
const { createEventDb } = require('../../lib/db/events');
const { createFlagDb } = require('../../lib/db/flags');

describe('createEventDb', () => {
	let flagId;
	let title = 'FROM POSTGRES EVENTS TEST';
	let description = 'Created new flag';
	let rollout = 20;

	beforeEach(async () => {
		await createFlagDb(title, description, rollout).then((res) => {
			flagId = res.id;
		});
	});

	afterEach(async () => {
		await clearTable([ 'Logs', 'Flags' ]);
	});

	test('creates an event', async () => {
		await createEventDb(flagId, title, description).then((res) => {
			expect(res.flag_id).toBe(flagId);
			expect(res.title).toBe(title);
			expect(res.description).toBe(description);
		});
	});
});
