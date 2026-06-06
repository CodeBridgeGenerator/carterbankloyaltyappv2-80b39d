const user = require("./user/user.service.js");
const category = require("./category/category.service.js");
const voucher = require("./voucher/voucher.service.js");
const cartItem = require("./cartItem/cartItem.service.js");
const cartItemHistory = require("./cartItemHistory/cartItemHistory.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(category);
  app.configure(voucher);
  app.configure(cartItem);
  app.configure(cartItemHistory);
    // ~cb-add-configure-service-name~
};
