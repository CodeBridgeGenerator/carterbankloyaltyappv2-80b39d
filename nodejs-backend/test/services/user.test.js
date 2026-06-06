const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("user service", async () => {
  let thisService;
  let userCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("user");

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
    assert.ok(thisService, "Registered the service (user)");
  });

  describe("#create", () => {
    const options = {"email":"new value","username":"new value","password":"new value","isActive":true,"points":23};

    beforeEach(async () => {
      userCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new user", () => {
      assert.strictEqual(userCreated.email, options.email);
assert.strictEqual(userCreated.username, options.username);
assert.strictEqual(userCreated.password, options.password);
assert.strictEqual(userCreated.isActive, options.isActive);
assert.strictEqual(userCreated.isActive, options.isActive);
assert.strictEqual(userCreated.points, options.points);
    });
  });

  describe("#get", () => {
    it("should retrieve a user by ID", async () => {
      const retrieved = await thisService.Model.findById(userCreated._id);
      assert.strictEqual(retrieved._id.toString(), userCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"email":"updated value","username":"updated value","password":"updated value","isActive":false,"points":100};

    it("should update an existing user ", async () => {
      const userUpdated = await thisService.Model.findByIdAndUpdate(
        userCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(userUpdated.email, options.email);
assert.strictEqual(userUpdated.username, options.username);
assert.strictEqual(userUpdated.password, options.password);
assert.strictEqual(userUpdated.isActive, options.isActive);
assert.strictEqual(userUpdated.isActive, options.isActive);
assert.strictEqual(userUpdated.points, options.points);
    });
  });

  describe("#delete", async () => {
    it("should delete a user", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const userDeleted = await thisService.Model.findByIdAndDelete(userCreated._id);
      assert.strictEqual(userDeleted._id.toString(), userCreated._id.toString());
    });
  });
});