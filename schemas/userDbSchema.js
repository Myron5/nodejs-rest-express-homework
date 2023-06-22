const { Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { passwordRegex, emailRegex } = require("../constants");

const schema = {
  password: {
    type: String,
    match: passwordRegex,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    match: emailRegex,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
};

const settings = {
  versionKey: false,
  timestamps: true,
};

const userDbSchema = new Schema(schema, settings);
userDbSchema.post("save", handleMongooseError);

module.exports = userDbSchema;
