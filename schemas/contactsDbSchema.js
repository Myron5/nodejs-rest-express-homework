const { Schema } = require('mongoose');

const { handleMongooseError } = require('../helpers');
const { emailRegex, phoneRegexOne, phoneRegexTwo, mongooseSchemaConfig } = require('../constants');

const schema = {
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match: emailRegex,
    required: true,
  },
  phone: {
    type: String,
    match: [phoneRegexOne, phoneRegexTwo],
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const contactsDbSchema = new Schema(schema, mongooseSchemaConfig);
contactsDbSchema.post('save', handleMongooseError);

module.exports = contactsDbSchema;
