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

		xtest('createFlagWithCustomDescription inserts new row', async () => {
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

		xtest('createFlagDb with description', async () => {
			await createFlagDb(title, description, rollout).then((res) => {
				const result = res.rows[res.rows.length - 1];
				expect(result.title).toEqual('FROM_TEST');
				expect(result.description).toEqual('A custom test description');
				expect(result.rollout).toEqual(25);
			});

			await fetchAllFlags().then((rows) => {
				expect(rows).toHaveLength(1);
			});
		});

		xtest('test data has cleared', async () => {
			await fetchAllFlags().then((rows) => {
				expect(rows.length).toEqual(0);
			});
		});

		xtest('fetching more than one flag', async () => {
			const titles = [ 'FROM_TEST', 'FROM_TEST2', 'FROM_TEST3' ];

			for (const title of titles) {
				await createFlagDb(title);
			}

			await fetchAllFlags().then((rows) => {
				console.log(rows);
				expect(rows.length).toEqual(3);
				titles.forEach((title, index) => {
					expect(rows[index].title).toBe(title);
				});
			});
		});

		xtest('fetching flag by id', async () => {
			let id;
			await createFlagDb('FROM_TEST').then((res) => {
				id = res.id;
			});

			await fetchFlag(id).then((res) => {
				expect(res.title).toEqual('FROM_TEST');
			});
		});

		xtest('updating flag', async () => {
			let id;
			await createFlagDb('FROM_TEST').then((res) => {
				id = res.id;
			});

			await updateFlagDb(id, 'FROM_TEST2', 'hello world', true).then((res) => {
				expect(res.title).toEqual('FROM_TEST2');
				expect(res.description).toEqual('hello world');
				expect(res.is_active).toEqual(true);
			});
		});

		xtest('deleting flag', async () => {
			let id;
			await createFlagDb('FROM_TEST').then((res) => {
				id = res.id;
			});

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
