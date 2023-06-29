const { Schema } = require('mongoose');
const { handleMongooseError, createHashPassword } = require('../helpers');
const { passwordRegex, emailRegex } = require('../constants');

const schema = {
  password: {
    type: String,
    match: passwordRegex,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailRegex,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: '',
  },
  avatarURL: {
    type: String,
    required: true,
  },
};

const settings = {
  versionKey: false,
  timestamps: true,
};

async function bindPasswordHash(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await createHashPassword(this.password);
  next();
}

const userDbSchema = new Schema(schema, settings);
userDbSchema.post('save', handleMongooseError);
userDbSchema.pre('save', bindPasswordHash);

module.exports = userDbSchema;
