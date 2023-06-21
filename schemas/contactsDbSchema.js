const { Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { emailRegex, phoneRegex1, phoneRegex2 } = require("../constants");

const schema = {
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailRegex,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    match: [phoneRegex1, phoneRegex2],
    unique: true,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
};

const settings = {
  versionKey: false,
  timestamps: true,
};

const contactsDbSchema = new Schema(schema, settings);
contactsDbSchema.post("save", handleMongooseError);

module.exports = contactsDbSchema;
