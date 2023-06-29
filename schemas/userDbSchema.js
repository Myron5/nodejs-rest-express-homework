const mongoose = require('mongoose');
const gravatar = require('gravatar');

const { handleMongooseError, createHashPassword, compareHashPassword } = require('../helpers');
const { passwordRegex, emailRegex, gravatarConfig, mongooseSchemaConfig } = require('../constants');

/**
 * Describes schema
 */
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
    default: '',
  },
};

/**
 * Mongoose middleware, used before creating or updaing user
 */
async function preSaveMiddleware(next) {
  // For assigning first avatar to user (require gravatar)
  if (this.isNew) {
    this.avatarURL = gravatar.url(this.email, gravatarConfig);
  }

  // For hashing password before save
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await createHashPassword(this.password);
  next();
}

/**
 * Method for user (returned by our model)
 */
async function checkPassword(candidate) {
  return await compareHashPassword(candidate, this.password);
}

/**
 * Creating schema
 */
const userDbSchema = new mongoose.Schema(schema, mongooseSchemaConfig);

userDbSchema.pre('save', preSaveMiddleware);
userDbSchema.post('save', handleMongooseError);
userDbSchema.methods.checkPassword = checkPassword;

module.exports = userDbSchema;
