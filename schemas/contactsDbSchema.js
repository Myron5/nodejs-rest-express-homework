const { Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const schema = {
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
};

const settings = {
  versionKey: false,
  timestamps: true,
};

const contactsDbSchema = new Schema(schema, settings);

contactsDbSchema.post("save", handleMongooseError);

module.exports = contactsDbSchema;
