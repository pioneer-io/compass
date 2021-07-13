const clearTestDb = require("../helper/clearTestDb");
const { createEventDb } = require("../../lib/postgres-events");
const { createFlagDb, fetchAllFlags, fetchFlag, updateFlagDb, deleteFlagDb } = require('../../lib/postgres-flags');

describe("createEventDb", () => {
  let flagId;
  let title = "FROM_TEST";
  let description = "Created new flag";

  beforeEach(async () => {
    await clearTestDb();
    await createFlagDb(title).then(res => {
      flagId = res.id;
    });
  });
  
  afterEach(async () => {
    await clearTestDb();
  });

  test("creates an event", async () => {
    await createEventDb(flagId, title, description).then(res => {
      expect(res.flag_id).toBe(flagId);
      expect(res.title).toBe(title);
      expect(res.description).toBe(description);
    });
  })
});