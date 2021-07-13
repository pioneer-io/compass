const { postgresQuery } = require('../../lib/postgres-query');
const { createFlagDb, fetchAllFlags, fetchFlag, updateFlagDb, deleteFlagDb } = require('../../lib/postgres-flags');

const clearTestDb = async() => {
  const DELETE_STRING = "DELETE FROM Flags";
  await postgresQuery(DELETE_STRING);
};

describe("test flag controller", () => {
  // initialize database
  
  afterEach(async () => {
    await clearTestDb();
  });

  // test("Test", () => {
    // query the db
  // });
  test("insert data test", async () => {
    // const QUERY_STRING = "INSERT INTO Flags(title, description, is_active) VALUES ('LOGIN_MICROSERVICE', 'Redirects users to the login microservice', FALSE) RETURNING *";
    // await testQuery(QUERY_STRING).then(res => {
    //   expect(res.rowCount).toBe(1);
    //   expect(res.rows[0].title).toBe("LOGIN_MICROSERVICE");
    // });

    await createFlagDb("FROM_TEST").then(res => {
      expect(res.title).toEqual("FROM_TEST");
    });
  });

  test("test data has cleared", async () => {
    await fetchAllFlags().then(rows => {
      expect(rows.length).toEqual(0);
    });
  });
  
  // drop database tables();
});