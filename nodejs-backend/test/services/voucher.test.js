const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("voucher service", async () => {
  let thisService;
  let voucherCreated;
  let usersServiceResults;
  let users;

  const categoryCreated = await app.service("category").Model.create({"categoryId":"parentObjectId","name":"new value"});

  beforeEach(async () => {
    thisService = await app.service("voucher");

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
    assert.ok(thisService, "Registered the service (voucher)");
  });

  describe("#create", () => {
    const options = {"categoryId":`${categoryCreated._id}`,"name":"new value","points":23,"title":"new value","image":"new value","description":"new value"};

    beforeEach(async () => {
      voucherCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new voucher", () => {
      assert.strictEqual(voucherCreated.categoryId.toString(), options.categoryId.toString());
assert.strictEqual(voucherCreated.points, options.points);
assert.strictEqual(voucherCreated.title, options.title);
assert.strictEqual(voucherCreated.image, options.image);
assert.strictEqual(voucherCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a voucher by ID", async () => {
      const retrieved = await thisService.Model.findById(voucherCreated._id);
      assert.strictEqual(retrieved._id.toString(), voucherCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"categoryId":`${categoryCreated._id}`,"points":100,"title":"updated value","image":"updated value","description":"updated value"};

    it("should update an existing voucher ", async () => {
      const voucherUpdated = await thisService.Model.findByIdAndUpdate(
        voucherCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(voucherUpdated.categoryId.toString(), options.categoryId.toString());
assert.strictEqual(voucherUpdated.points, options.points);
assert.strictEqual(voucherUpdated.title, options.title);
assert.strictEqual(voucherUpdated.image, options.image);
assert.strictEqual(voucherUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a voucher", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("category").Model.findByIdAndDelete(categoryCreated._id);;

      const voucherDeleted = await thisService.Model.findByIdAndDelete(voucherCreated._id);
      assert.strictEqual(voucherDeleted._id.toString(), voucherCreated._id.toString());
    });
  });
});