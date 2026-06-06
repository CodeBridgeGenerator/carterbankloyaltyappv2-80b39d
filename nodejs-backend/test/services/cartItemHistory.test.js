const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("cartItemHistory service", async () => {
  let thisService;
  let cartItemHistoryCreated;
  let usersServiceResults;
  let users;

  const userCreated = await app.service("user").Model.create({"user":"parentObjectId","email":"new value","username":"new value","password":"new value","isActive":true,"points":23});
const categoryCreated = await app.service("category").Model.create({"user":`${userCreated._id}`,"email":"new value","username":"new value","password":"new value","isActive":true,"points":23,"voucher":"parentObjectId","categoryId":"parentObjectId","name":"new value"});
const voucherCreated = await app.service("voucher").Model.create({"user":`${userCreated._id}`,"email":"new value","username":"new value","password":"new value","isActive":true,"points":23,"voucher":"parentObjectId","categoryId":`${categoryCreated._id}`,"name":"new value","title":"new value","image":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("cartItemHistory");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (cartItemHistory)");
  });

  describe("#create", () => {
    const options = {"user":`${userCreated._id}`,"email":"new value","username":"new value","password":"new value","isActive":true,"points":23,"voucher":`${voucherCreated._id}`,"categoryId":`${categoryCreated._id}`,"name":"new value","title":"new value","image":"new value","description":"new value","quantity":23,"timestamp":"2026-06-06T07:24:23.925Z"};

    beforeEach(async () => {
      cartItemHistoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cartItemHistory", () => {
      assert.strictEqual(cartItemHistoryCreated.user.toString(), options.user.toString());
assert.strictEqual(cartItemHistoryCreated.voucher.toString(), options.voucher.toString());
assert.strictEqual(cartItemHistoryCreated.quantity, options.quantity);
assert.strictEqual(cartItemHistoryCreated.timestamp.toISOString(), options.timestamp);
    });
  });

  describe("#get", () => {
    it("should retrieve a cartItemHistory by ID", async () => {
      const retrieved = await thisService.Model.findById(cartItemHistoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), cartItemHistoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"user":`${userCreated._id}`,"voucher":`${voucherCreated._id}`,"quantity":100,"timestamp":"2026-06-06T07:24:23.925Z"};

    it("should update an existing cartItemHistory ", async () => {
      const cartItemHistoryUpdated = await thisService.Model.findByIdAndUpdate(
        cartItemHistoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(cartItemHistoryUpdated.user.toString(), options.user.toString());
assert.strictEqual(cartItemHistoryUpdated.voucher.toString(), options.voucher.toString());
assert.strictEqual(cartItemHistoryUpdated.quantity, options.quantity);
assert.strictEqual(cartItemHistoryUpdated.timestamp.toISOString(), options.timestamp);
    });
  });

  describe("#delete", async () => {
    it("should delete a cartItemHistory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("user").Model.findByIdAndDelete(userCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);
await app.service("voucher").Model.findByIdAndDelete(voucherCreated._id);;

      const cartItemHistoryDeleted = await thisService.Model.findByIdAndDelete(cartItemHistoryCreated._id);
      assert.strictEqual(cartItemHistoryDeleted._id.toString(), cartItemHistoryCreated._id.toString());
    });
  });
});