const clearTable = require('../helper/clearTable');
const {
	createFlagWithCustomDescription,
	createFlagWithDefaultDescription,
	createFlagDb,
	fetchAllFlags,
	fetchFlag,
	updateFlagDb,
	deleteFlagDb
} = require('../../lib/db/flags');

describe('test flag lib', () => {
	const originalError = console.error;
	afterEach(() => (console.error = originalError));

	describe('test flag methods', () => {
		const title = 'FROM_TEST';
		const description = 'A custom test description';
		const rollout = 25;

		// for mocking console.error
		let consoleOutput = [];
		const mockedConsoleError = (output) => consoleOutput.push(output);

		// mock console error
		beforeEach(() => (console.error = mockedConsoleError));

		// clear data from tables and reset console.error to non-mocked original function
		afterEach(async () => {
			await clearTable([ 'Flags' ]);
			() => (console.error = originalError);
		});

		test('flag table data is clearing', async () => {
			await fetchAllFlags().then((rows) => {
				expect(rows).toHaveLength(0);
			});
		});

		test('createFlagWithCustomDescription inserts new row', async () => {
			await createFlagWithCustomDescription(title, description, rollout).then((res) => {
				const result = res.rows[res.rows.length - 1];
				expect(result.title).toEqual('FROM_TEST');
				expect(result.description).toEqual('A custom test description');
				expect(result.rollout).toEqual(25);
			});

			await fetchAllFlags().then((rows) => {
				expect(rows).toHaveLength(1);
			});
		});

		// not functional yet
		xtest('createFlagWithCustomDescription should raise error with invalid args', async () => {
			expect(() => {
				createFlagWithCustomDescription(undefined, description, rollout);
			}).rejects.toThrow();
		});

		test('createFlagWithDefaultDescription inserts new row', async () => {
			await createFlagWithDefaultDescription(title, rollout).then((res) => {
				const result = res.rows[res.rows.length - 1];
				expect(result.title).toEqual('FROM_TEST');
				expect(result.description).toEqual('No description provided.');
				expect(result.rollout).toEqual(25);
			});

			await fetchAllFlags().then((rows) => {
				expect(rows).toHaveLength(1);
			});
		});

		test('createFlagDb with description', async () => {
			await createFlagDb(title, description, rollout).then((res) => {
				expect(res.title).toEqual('FROM_TEST');
				expect(res.description).toEqual('A custom test description');
				expect(res.rollout).toEqual(25);
			});

			await fetchAllFlags().then((rows) => {
				expect(rows).toHaveLength(1);
			});
		});

		test('createFlagDb without description', async () => {
			await createFlagDb(title, '', rollout).then((res) => {
				expect(res.title).toEqual('FROM_TEST');
				expect(res.description).toEqual('No description provided.');
				expect(res.rollout).toEqual(25);
			});

			await fetchAllFlags().then((rows) => {
				expect(rows).toHaveLength(1);
			});
		});

		// create with duplicate title should error

		test('fetchAllFlags should retrieve three distinct flags', async () => {
			const flagsToInsert = [
				{ title: 'FROM_TEST', description: 'desc 1', rollout: 1 },
				{ title: 'FROM_TEST2', description: 'desc 2', rollout: 2 },
				{ title: 'FROM_TEST3', description: 'desc 3', rollout: 3 }
			];

			for (const flag of flagsToInsert) {
				await createFlagDb(flag.title, flag.description, flag.rollout);
			}

			await fetchAllFlags().then((rows) => {
				console.log(rows);
				expect(rows.length).toEqual(3);
				flagsToInsert.forEach((flag, index) => {
					expect(rows[index].title).toBe(flag.title);
				});
			});
		});

		describe('testing functions based on id', () => {
			// set an id variable that can be updated on each test
			let id;

			beforeEach(async () => {
				await createFlagDb(title, description, rollout).then((res) => {
					id = res.id;
				});
			});

			test('fetchFlag returns flag by id', async () => {
				await fetchFlag(id).then((res) => {
					expect(res.title).toEqual(title);
					expect(res.description).toEqual(description);
					expect(res.rollout).toEqual(rollout);
				});
			});

			test('updateFlagDb updates flag properties', async () => {
				await updateFlagDb(id, 'FROM_TEST updated', 'hello world', true, 99).then((res) => {
					expect(res.title).toEqual('FROM_TEST updated');
					expect(res.description).toEqual('hello world');
					expect(res.is_active).toEqual(true);
				});
			});

			test('deleteFlagDb deletes solo entry', async () => {
				await deleteFlagDb(id).then((res) => {
					expect(res).toEqual(true);
				});

				// deleting a flag a second time returns false
				await deleteFlagDb(id).then((res) => {
					expect(res).toEqual(false);
				});
			});
		});
	});
});
