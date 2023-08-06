const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const configs = require('../configs');
const { errors } = require('../utils/constants');
const { validateEmail, cleanKeys } = require('../utils/utils');
const ObjectId = mongoose.Types.ObjectId;

const schema = mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  company: { type: ObjectId, ref: 'Company', required: false },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => {
        return validateEmail(v);
      },
      message: 'invalid'
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  type: { type: String, enum: ['user', 'admin'], default: 'user', lowercase: true },
  status: { type: String, enum: ['active', 'pending'], default: 'pending', lowercase: true },
  code: { type: String },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

schema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
});

schema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, configs.server.JWT_KEY, {
    expiresIn: configs.server.JWT_TOKEN_LIFETIME
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token
};

schema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw { ...errors.NOT_FOUND_OBJECT, message: `email.not_found` };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw { ...errors.NOT_MATCH, message: `password.not_match` };
  }
  return user
};

schema.statics.cleanKeys = (body, keys = undefined) => {
  return cleanKeys(body, keys ? keys : ["type", "tokens"]);
};

const User = mongoose.model('User', schema);

module.exports = User;