
    module.exports = function (app) {
        const modelName = "user";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            email: { type:  String , trim: true, comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
username: { type:  String , trim: true, comment: "Username, p, false, true, true, true, true, true, true, , , , ," },
password: { type:  String , trim: true, comment: "Password, p, false, true, true, true, true, true, true, , , , ," },
isActive: { type: Boolean, required: false, comment: "Is Active, switch, false, true, true, true, true, true, true, , , , ," },
points: { type: Number, comment: "Points, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };