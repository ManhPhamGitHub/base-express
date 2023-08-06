const BaseService = require('./baseService');
const User = require('../models/user');
const { authErrors, errors } = require('../utils/constants');

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async create(object) {
    try {
      object = await this.model.cleanKeys(object, ["tokens"]);
    } catch (error) { }
    const user = await User.create(object);
    return await User.cleanKeys(user.toObject(), ["password", "__v", "company", "tokens"]);
  }

  async login(data) {
    const { email, password } = data;
    const user = await User.findByCredentials(email, password);
    const status = await User.findOne({ email: email })
    if (status.status === "pending") {
      throw {
        ...authErrors.NOT_FOUND_OBJECT,
        message: 'user.not_active',
        desc: `Cannot find email = ${email}`,
      };
    }
    if (!user) {
      throw {
        ...authErrors.NOT_FOUND_OBJECT,
        message: 'user.not_found',
        desc: `Cannot find email = ${email}`,
      };
    }
    const token = await user.generateAuthToken();
    return { token, lang: user.lang, name: user.name, _id: user._id, avatar: user.avatar };
  }

  async logout(id, token) {
    const user = await User.findById(id);
    if (!user) {
      throw {
        ...errors.NOT_FOUND_OBJECT,
        message: 'user.not_found',
        desc: `Cannot find user`,
      };
    }
    for (const t of user.tokens) {
      if (t.token === token) {
        const pullAll = { $pullAll: { tokens: [t] } };
        await User.findOneAndUpdate({ _id: id }, pullAll);
      }
    }
  }

  async logoutAll(id) {
    const user = await User.findById(id);
    if (!user) {
      throw {
        ...errors.NOT_FOUND_OBJECT,
        message: 'user.not_found',
        desc: `Cannot find user`,
      };
    }
    await User.findOneAndUpdate({ _id: id }, { tokens: [] });
  }
}

module.exports = new UserService();