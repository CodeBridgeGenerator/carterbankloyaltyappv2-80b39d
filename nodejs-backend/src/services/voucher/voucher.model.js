
    module.exports = function (app) {
        const modelName = "voucher";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            categoryId: { type: Schema.Types.ObjectId, ref: "category", comment: "Category, dropdown, false, true, true, true, true, true, true, category, category, one-to-one, name," },
points: { type: Number, comment: "Points, p_number, false, true, true, true, true, true, true, , , , ," },
title: { type:  String , trim: true, comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
image: { type:  [Schema.Types.ObjectId], ref: "document_storages" , trim: true, comment: "Image, file_upload, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };