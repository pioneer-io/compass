const clearTable = require("../helper/clearTable");
const { createFlagDb, fetchAllFlags, fetchFlag, updateFlagDb, deleteFlagDb } = require('../../lib/postgres-flags');

describe("test flag controller", () => {
  
  afterEach(async () => {
    await clearTable(['Flags']);
  });

  xtest("insert data test", async () => {
    await createFlagDb("FROM_TEST").then(res => {
      expect(res.title).toEqual("FROM_TEST");
    });

    await fetchAllFlags().then(rows => {
      expect(rows.length).toEqual(1);
    });
  });

  xtest("test data has cleared", async () => {
    await fetchAllFlags().then(rows => {
      expect(rows.length).toEqual(0);
    });
  });

  test("fetching more than one flag", async () => {
    const titles = ["FROM_TEST", "FROM_TEST2", "FROM_TEST3"];
    
    for (const title of titles) {
      await createFlagDb(title);
    }

    await fetchAllFlags().then(rows => {
      console.log(rows);
      expect(rows.length).toEqual(3);
      titles.forEach((title, index) => {
        expect(rows[index].title).toBe(title);
      });
    });
  });

  xtest("fetching flag by id", async () => {
    let id;
    await createFlagDb("FROM_TEST").then(res => {
      id = res.id;
    });
    
    await fetchFlag(id).then(res => {
      expect(res.title).toEqual("FROM_TEST");
    })
  });

  xtest("updating flag", async () => {
    let id;
    await createFlagDb("FROM_TEST").then(res => {
      id = res.id;
    });

    await updateFlagDb(id, "FROM_TEST2", "hello world", true).then(res => {
      expect(res.title).toEqual("FROM_TEST2");
      expect(res.description).toEqual("hello world");
      expect(res.is_active).toEqual(true);
    });
  });

  xtest("deleting flag", async () => {
    let id;
    await createFlagDb("FROM_TEST").then(res => {
      id = res.id;
    });

    await deleteFlagDb(id).then(res => {
      expect(res).toEqual(true);
    });
    
    // deleting a flag a second time returns false
    await deleteFlagDb(id).then(res => {
      expect(res).toEqual(false);
    });
  });

});