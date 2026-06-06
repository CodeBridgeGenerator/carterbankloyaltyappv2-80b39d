const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("cartItem service", async () => {
  let thisService;
  let cartItemCreated;
  let usersServiceResults;
  let users;

  const userCreated = await app.service("user").Model.create({"user":"parentObjectId","email":"new value","username":"new value","password":"new value","isActive":true,"points":23});
const categoryCreated = await app.service("category").Model.create({"user":`${userCreated._id}`,"email":"new value","username":"new value","password":"new value","isActive":true,"points":23,"voucher":"parentObjectId","categoryId":"parentObjectId","name":"new value"});
const voucherCreated = await app.service("voucher").Model.create({"user":`${userCreated._id}`,"email":"new value","username":"new value","password":"new value","isActive":true,"points":23,"voucher":"parentObjectId","categoryId":`${categoryCreated._id}`,"name":"new value","title":"new value","image":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("cartItem");

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
    assert.ok(thisService, "Registered the service (cartItem)");
  });

  describe("#create", () => {
    const options = {"user":`${userCreated._id}`,"email":"new value","username":"new value","password":"new value","isActive":true,"points":23,"voucher":`${voucherCreated._id}`,"categoryId":`${categoryCreated._id}`,"name":"new value","title":"new value","image":"new value","description":"new value","quantity":23};

    beforeEach(async () => {
      cartItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cartItem", () => {
      assert.strictEqual(cartItemCreated.user.toString(), options.user.toString());
assert.strictEqual(cartItemCreated.voucher.toString(), options.voucher.toString());
assert.strictEqual(cartItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a cartItem by ID", async () => {
      const retrieved = await thisService.Model.findById(cartItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), cartItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"user":`${userCreated._id}`,"voucher":`${voucherCreated._id}`,"quantity":100};

    it("should update an existing cartItem ", async () => {
      const cartItemUpdated = await thisService.Model.findByIdAndUpdate(
        cartItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(cartItemUpdated.user.toString(), options.user.toString());
assert.strictEqual(cartItemUpdated.voucher.toString(), options.voucher.toString());
assert.strictEqual(cartItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a cartItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("user").Model.findByIdAndDelete(userCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);
await app.service("voucher").Model.findByIdAndDelete(voucherCreated._id);;

      const cartItemDeleted = await thisService.Model.findByIdAndDelete(cartItemCreated._id);
      assert.strictEqual(cartItemDeleted._id.toString(), cartItemCreated._id.toString());
    });
  });
});