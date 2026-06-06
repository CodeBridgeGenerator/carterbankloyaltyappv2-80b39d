
    module.exports = function (app) {
        const modelName = "cart_item_history";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            user: { type: Schema.Types.ObjectId, ref: "user", comment: "User, dropdown, false, true, true, true, true, true, true, user, user, one-to-one, username," },
voucher: { type: Schema.Types.ObjectId, ref: "voucher", comment: "Voucher, dropdown, false, true, true, true, true, true, true, voucher, voucher, one-to-one, title," },
quantity: { type: Number, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
timestamp: { type: Date, comment: "Timestamp, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };