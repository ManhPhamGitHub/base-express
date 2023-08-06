const { msgResponse } = require('../utils/constants');
const { exportParams } = require('../utils/utils');
const { toErrorResponse, toResponse } = require('../utils/responseUtils');
const sendMail = require("../modules/sendMail")
const crypto = require('crypto');
const User = require('../models/user');
const { errors } = require('../utils/constants');
class BaseController {
  constructor(service) {
    this.service = service;
  }

  // check access permission user's request
  async checkPermission(req, res, next) {
    next();
  }

  async create(req, res, message = msgResponse.CREATE_SUCCESS) {
    try {
      if (!req.body.code) {
        throw { ...errors.NOT_FOUND_OBJECT }
      }
      const id = req.params.id
      const code = await User.findById({ _id: id })
      if (!code) {
        throw { ...errors.PARAM_INVALID }
      }
      if (code.code === req.body.code) {
        const rs = await User.findByIdAndUpdate({ _id: id }, { status: "active", code: "done" })
        return res.send(toResponse(message));
      } throw {
        ...errors.CODE_NOT_MATCH
      }
    } catch (error) {
      console.log('Create', error);
      return res.send(toErrorResponse(error));
    }
  }

  async sendMail(req, res, message = msgResponse.SEND_MAIL_SUCCESS) {
    try {
      const email = req.body.email
      const code = await crypto.randomInt(0, 999999).toString().padStart(6, '0')
      var body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: "pending",
        type: "user",
        code: code
      }
      const rs = await this.service.create(body)
      const ress = await sendMail({ email, code })
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('Send', error);
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
      let { query, fields, page, size, sorts } = await exportParams(req);
      const populate = [];
      const fieldSchemaCustom = [];
      const rs = await this.service.getAll({ query, fields, page, size, sorts, populate, fieldSchemaCustom, isFull });
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('GetAll', error);
      return res.send(toErrorResponse(error));
    }
  }

  async get(req, res, message = msgResponse.GET_SUCCESS) {
    try {
      const query = { _id: req.params['id'] };
      const populate = [];
      const fields = "";
      const rs = await this.service.get(query, populate, { fields });
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('Get one', error);
      return res.send(toErrorResponse(error));
    }
  }

  async update(req, res, message = msgResponse.UPDATE_SUCCESS) {
    try {
      const query = { _id: req.params['id'] };
      const select = "";
      const rs = await this.service.update(query, req.body, { select });
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('Update', error);
      return res.send(toErrorResponse(error));
    }
  }

  async delete(req, res, message = msgResponse.DELETE_SUCCESS) {
    try {
      const query = { _id: req.params['id'] };
      const rs = await this.service.delete(query);
      return res.send(toResponse(rs, message));
    } catch (error) {
      console.log('Remove', error);
      return res.send(toErrorResponse(error, message));
    }
  }

}

module.exports = BaseController;