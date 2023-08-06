const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {authErrors} = require('../utils/constants');
const {toErrorResponse} = require('../utils/responseUtils');
const configs = require('../configs');

const auth = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw ({
        ...authErrors.PARAM_REQUIRED,
        message: 'token.required',
      });
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, configs.server.JWT_KEY);
    const user = await User.findOne({_id: data._id, 'tokens.token': token});
    if (!user) {
      throw ({
        ...authErrors.NOT_FOUND_OBJECT,
        message: 'token.not_found',
        desc: `cannot find user`,
      });
    }
    req.user = user;
    req.token = token;

    // if using company field
    // req.query = { ...req.query, company: user.company._id || user.company };
    // req.body.company = user.company;

    next();
  } catch (error) {
    return res.send(toErrorResponse(error));
  }

};

module.exports = auth;
