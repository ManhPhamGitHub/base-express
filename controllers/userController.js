const BaseController = require('./baseController');
const userService = require('../services/userService');
const { msgResponse, errors } = require('../utils/constants');
const {toResponse, toErrorResponse} = require('../utils/responseUtils');
const bcrypt = require('bcryptjs');
const {exportParams, checkKeyInObject} = require('../utils/utils');

class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  async get(req, res, message = msgResponse.GET_SUCCESS) {
    try {
      const query = {_id: req.params['id']};
      const populate = [];
      const fields = "company name email type";
      const rs = await this.service.get(query, populate, {fields});
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('Get one', error);
      return res.send(toErrorResponse(error));
    }
  }

  async getAll(req, res, message = msgResponse.GET_ALL_SUCCESS) {
    try {
      let isFull = false;
      // remove comment if want get all full
      // if (!req.query.page && !req.query.size) {
      //   isFull = true;
      // }
      let {query, fields, page, size, sorts} = await exportParams(req);
      const populate = [];
      const fieldSchemaCustom = [];
      const rs = await this.service.getAll({query, fields: "company type name email", page, size, sorts, populate, fieldSchemaCustom, isFull});
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('GetAll', error);
      return res.send(toErrorResponse(error));
    }
  }

  async update(req, res, message = msgResponse.UPDATE_SUCCESS) {
    try {
      const query = {_id: req.params['id']};
      const select = "company name email type";
      if (req.body.password) {
        if (req.body.password.length < 8) throw {...errors.MIN_LENGTH, message: "password.short"}
        req.body.password = await bcrypt.hash(req.body.password, 8);
      }
      const rs = await this.service.update(query, req.body, {select});
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('Update', error);
      return res.send(toErrorResponse(error));
    }
  }

  async login(req, res, message = msgResponse.LOGIN_SUCCESS) {
    try {
      checkKeyInObject(req.body, "email password");
      const rs = await userService.login(req.body);
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.error("Error Login ===> ", error);
      return res.send(toErrorResponse(error));
    }
  }

  async logout(req, res, message = msgResponse.LOGOUT_SUCCESS) {
    try {
      await userService.logout(req.user._id, req.token);
      return res.send(toResponse({}, message));
    } catch (error) {
      console.error(error);
      return res.send(toErrorResponse(error));
    }
  }

  async logoutAll(req, res, message = msgResponse.LOGOUT_SUCCESS) {
    try {
      await userService.logoutAll(req.user._id);
      return res.send(toResponse({}, message));
    } catch (error) {
      console.error(error);
      return res.send(toErrorResponse(error));
    }
  }
}

module.exports = new UserController();
